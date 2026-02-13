using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class DeleteScheduleCommandHandler : IRequestHandler<DeleteScheduleCommand>
{
    private readonly IScheduleRepository _repo;

    public DeleteScheduleCommandHandler(IScheduleRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(DeleteScheduleCommand request, CancellationToken cancellationToken)
    {
        await _repo.DeleteAsync(request.Id);
    }
}
