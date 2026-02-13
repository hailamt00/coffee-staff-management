using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class ApproveShiftRequestCommandHandler
    : IRequestHandler<ApproveShiftRequestCommand>
{
    private readonly IScheduleRequestRepository _requestRepo;
    private readonly IScheduleRepository _scheduleRepo;

    public ApproveShiftRequestCommandHandler(
        IScheduleRequestRepository requestRepo,
        IScheduleRepository scheduleRepo)
    {
        _requestRepo = requestRepo;
        _scheduleRepo = scheduleRepo;
    }

    public async Task Handle(
    ApproveShiftRequestCommand request,
    CancellationToken cancellationToken)
    {
        var shiftRequest = await _requestRepo.GetByIdAsync(request.RequestId);
        if (shiftRequest == null)
            throw new KeyNotFoundException("Shift request not found");

        if (shiftRequest.Status != ScheduleRequestStatus.Pending)
            throw new ArgumentException("Shift request already processed");

        if (request.IsApproved)
        {
            // Check if already exists to avoid exact duplicates
            var exists = await _scheduleRepo.ExistsAsync(
                shiftRequest.EmployeeId,
                shiftRequest.ShiftId,
                shiftRequest.WorkDate);

            if (exists)
                throw new ArgumentException("Schedule already exists for this shift");

            // Conflict Check: Check overlaps with existing schedules
            if (shiftRequest.Shift != null)
            {
                var existingSchedules = await _scheduleRepo.GetByEmployeeAndDateAsync(
                    shiftRequest.EmployeeId,
                    shiftRequest.WorkDate);

                foreach (var existing in existingSchedules)
                {
                    if (existing.Shift != null)
                    {
                        // Overlap logic: a.Start < b.End && b.Start < a.End
                        if (shiftRequest.Shift.StartTime < existing.Shift.EndTime && existing.Shift.StartTime < shiftRequest.Shift.EndTime)
                        {
                            throw new Exception($"Approving this request would conflict with existing shift '{existing.Shift.Name}' ({existing.Shift.StartTime:hh\\:mm}-{existing.Shift.EndTime:hh\\:mm})");
                        }
                    }
                }
            }

            shiftRequest.Status = ScheduleRequestStatus.Approved;

            var schedule = new Schedule
            {
                EmployeeId = shiftRequest.EmployeeId,
                ShiftId = shiftRequest.ShiftId,
                WorkDate = shiftRequest.WorkDate,
                ApprovedAt = DateTime.UtcNow,
                Note = shiftRequest.Note // Carry over note from request
            };

            await _scheduleRepo.AddAsync(schedule);
        }
        else
        {
            shiftRequest.Status = ScheduleRequestStatus.Rejected;
        }

        await _requestRepo.UpdateAsync(shiftRequest);
    }
}