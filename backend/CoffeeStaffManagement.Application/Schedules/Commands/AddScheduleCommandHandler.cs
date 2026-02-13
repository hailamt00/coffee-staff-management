using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class AddScheduleCommandHandler : IRequestHandler<AddScheduleCommand>
{
    private readonly IScheduleRepository _repo;
    private readonly IShiftRepository _shiftRepo;

    public AddScheduleCommandHandler(IScheduleRepository repo, IShiftRepository shiftRepo)
    {
        _repo = repo;
        _shiftRepo = shiftRepo;
    }

    public async Task Handle(AddScheduleCommand request, CancellationToken cancellationToken)
    {
        // Fetch existing schedules for this employee on this date to check for conflicts
        var existingSchedules = await _repo.GetByEmployeeAndDateAsync(request.EmployeeId, request.WorkDate);

        foreach (var shiftId in request.ShiftIds)
        {
            // Check if already exists to avoid exact duplicates
            if (await _repo.ExistsAsync(request.EmployeeId, shiftId, request.WorkDate))
                continue;

            // Fetch shift details to get times
            var shift = await _shiftRepo.GetByIdAsync(shiftId);
            if (shift == null) continue;

            // Conflict Check: Check overlaps with existing schedules
            foreach (var existing in existingSchedules)
            {
                if (existing.Shift != null)
                {
                    // Overlap logic: a.Start < b.End && b.Start < a.End
                    if (shift.StartTime < existing.Shift.EndTime && existing.Shift.StartTime < shift.EndTime)
                    {
                        throw new Exception($"Shift '{shift.Name}' overlaps with existing shift '{existing.Shift.Name}' for this employee.");
                    }
                }
            }

            var schedule = new Schedule
            {
                EmployeeId = request.EmployeeId,
                ShiftId = shiftId,
                WorkDate = request.WorkDate,
                ApprovedAt = DateTime.UtcNow,
                Note = request.Note
            };

            await _repo.AddAsync(schedule);
        }
    }
}
