using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class UpdateScheduleCommandHandler : IRequestHandler<UpdateScheduleCommand>
{
    private readonly IScheduleRepository _repo;

    public UpdateScheduleCommandHandler(IScheduleRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(UpdateScheduleCommand request, CancellationToken cancellationToken)
    {
        var schedule = await _repo.GetByIdAsync(request.Id);
        if (schedule != null)
        {
            schedule.ShiftId = request.ShiftId;
            schedule.WorkDate = request.WorkDate;
            schedule.Note = request.Note;

            await _repo.UpdateAsync(schedule);
        }
    }
}
