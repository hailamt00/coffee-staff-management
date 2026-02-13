using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

public class DeleteShiftRequestCommandHandler
    : IRequestHandler<DeleteShiftRequestCommand>
{
    private readonly IScheduleRequestRepository _repo;

    public DeleteShiftRequestCommandHandler(IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        DeleteShiftRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await _repo.GetByIdAsync(request.Id);
        if (entity != null)
        {
            await _repo.DeleteAsync(entity);
        }
    }
}
