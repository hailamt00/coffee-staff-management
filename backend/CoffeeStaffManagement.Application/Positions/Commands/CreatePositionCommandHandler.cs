using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Application.Common.Exceptions;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public class CreatePositionCommandHandler
    : IRequestHandler<CreatePositionCommand, int>
{
    private readonly IPositionRepository _repo;

    public CreatePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> Handle(
        CreatePositionCommand request,
        CancellationToken cancellationToken)
    {
        var name = request.Request.Name.Trim();

        if (await _repo.ExistsAsync(name))
            throw new BadRequestException("Position already exists");

        var position = new Position { Name = name };
        await _repo.AddAsync(position);

        return position.Id;
    }
}
