using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class ApproveShiftRequestCommandHandler
    : IRequestHandler<ApproveShiftRequestCommand>
{
    private readonly IEmployeeShiftRequestRepository _requestRepo;
    private readonly IScheduleRepository _scheduleRepo;

    public ApproveShiftRequestCommandHandler(
        IEmployeeShiftRequestRepository requestRepo,
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
            throw new Exception("Shift request not found");

        if (shiftRequest.Status != "PENDING")
            throw new Exception("Shift request already processed");

        if (request.IsApproved)
        {
            var exists = await _scheduleRepo.ExistsAsync(
                shiftRequest.EmployeeId,
                shiftRequest.ShiftId,
                shiftRequest.WorkDate);

            if (exists)
                throw new Exception("Schedule already exists");

            shiftRequest.Status = "APPROVED";

            var schedule = new Schedule
            {
                EmployeeId = shiftRequest.EmployeeId,
                ShiftId = shiftRequest.ShiftId,
                WorkDate = shiftRequest.WorkDate,
                ApprovedBy = request.ApprovedBy,
                ApprovedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            await _scheduleRepo.AddAsync(schedule);
        }
        else
        {
            shiftRequest.Status = "REJECTED";
        }

        shiftRequest.UpdatedAt = DateTime.UtcNow;
        await _requestRepo.UpdateAsync(shiftRequest);
    }
}