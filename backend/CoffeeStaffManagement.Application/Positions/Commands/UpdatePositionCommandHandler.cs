using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public class UpdatePositionCommandHandler
    : IRequestHandler<UpdatePositionCommand, Unit>
{
    private readonly IPositionRepository _repo;

    public UpdatePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(
        UpdatePositionCommand request,
        CancellationToken cancellationToken)
    {
        var position = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Position not found");

        position.Name = request.Name.Trim();

        await _repo.UpdateAsync(position);

        return Unit.Value;
    }
}
