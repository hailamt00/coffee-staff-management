using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class AddScheduleCommandHandler : IRequestHandler<AddScheduleCommand>
{
    private readonly IScheduleRepository _repo;

    public AddScheduleCommandHandler(IScheduleRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(AddScheduleCommand request, CancellationToken cancellationToken)
    {
        foreach (var shiftId in request.ShiftIds)
        {
            // Check if already exists to avoid duplicates
            if (await _repo.ExistsAsync(request.EmployeeId, shiftId, request.WorkDate))
                continue;

            var schedule = new Schedule
            {
                EmployeeId = request.EmployeeId,
                ShiftId = shiftId,
                WorkDate = request.WorkDate,
                ApprovedAt = DateTime.UtcNow
            };

            await _repo.AddAsync(schedule);
        }
    }
}
