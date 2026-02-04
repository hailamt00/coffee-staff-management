using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public class GetPositionsQueryHandler
    : IRequestHandler<GetPositionsQuery, List<PositionDto>>
{
    private readonly IPositionRepository _repo;

    public GetPositionsQueryHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<PositionDto>> Handle(
        GetPositionsQuery request,
        CancellationToken cancellationToken)
    {
        var positions = await _repo.GetAllAsync();

        return positions
            .Select(p => new PositionDto(p.Id, p.Name))
            .ToList();
    }
}
