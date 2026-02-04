using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public class DeletePositionCommandHandler
    : IRequestHandler<DeletePositionCommand, Unit>
{
    private readonly IPositionRepository _repo;

    public DeletePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(
        DeletePositionCommand request,
        CancellationToken cancellationToken)
    {
        var position = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Position not found");

        await _repo.DeleteAsync(position);

        return Unit.Value;
    }
}
