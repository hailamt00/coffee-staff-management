using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Positions.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public class GetPositionByIdQueryHandler
    : IRequestHandler<GetPositionByIdQuery, PositionDto?>
{
    private readonly IPositionRepository _repo;

    public GetPositionByIdQueryHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<PositionDto?> Handle(
        GetPositionByIdQuery request,
        CancellationToken cancellationToken)
    {
        var position = await _repo.GetByIdAsync(request.Id);

        if (position is null)
            return null;

        return new PositionDto
        (
            position.Id,
            position.Name
        );
    }
}
