using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
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
        if (await _repo.ExistsAsync(request.Request.Name))
            throw new Exception("Position already exists");

        var position = new Position
        {
            Name = request.Request.Name
        };

        await _repo.AddAsync(position);

        return position.Id;
    }
}
