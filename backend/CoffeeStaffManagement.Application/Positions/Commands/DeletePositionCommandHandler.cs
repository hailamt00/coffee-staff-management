using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public class DeletePositionCommandHandler
    : IRequestHandler<DeletePositionCommand>
{
    private readonly IPositionRepository _repo;

    public DeletePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        DeletePositionCommand request,
        CancellationToken cancellationToken)
    {
        var position = await _repo.GetByIdAsync(request.Id)
            ?? throw new KeyNotFoundException("Position not found");

        await _repo.DeleteAsync(position);
    }
}
