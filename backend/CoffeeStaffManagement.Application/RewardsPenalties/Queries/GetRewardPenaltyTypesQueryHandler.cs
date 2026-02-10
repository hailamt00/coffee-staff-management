using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Queries;

public record GetRewardPenaltyTypesQuery() : IRequest<List<RewardPenaltyTypeDto>>;

public class GetRewardPenaltyTypesQueryHandler : IRequestHandler<GetRewardPenaltyTypesQuery, List<RewardPenaltyTypeDto>>
{
    private readonly IRewardPenaltyRepository _repo;

    public GetRewardPenaltyTypesQueryHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RewardPenaltyTypeDto>> Handle(GetRewardPenaltyTypesQuery request, CancellationToken ct)
    {
        var types = await _repo.GetTypesAsync();
        return types.Select(t => new RewardPenaltyTypeDto
        {
            Id = t.Id,
            Name = t.Name,
            Type = t.Type.ToString()
        }).ToList();
    }
}
