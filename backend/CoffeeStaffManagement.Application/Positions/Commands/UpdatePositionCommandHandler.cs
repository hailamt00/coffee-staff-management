using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Application.Common.Exceptions;
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
            ?? throw new NotFoundException("Position not found");

        var name = request.Name.Trim();

        if (await _repo.ExistsAsync(name, request.Id))
            throw new BadRequestException("Position already exists");

        position.Name = name;
        await _repo.UpdateAsync(position);

        return Unit.Value;
    }
}
