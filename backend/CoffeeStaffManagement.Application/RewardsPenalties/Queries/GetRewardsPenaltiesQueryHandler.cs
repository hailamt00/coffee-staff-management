using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Queries;

public class GetRewardsPenaltiesQueryHandler : IRequestHandler<GetRewardsPenaltiesQuery, List<RewardPenaltyDto>>
{
    private readonly IRewardPenaltyRepository _repo;

    public GetRewardsPenaltiesQueryHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RewardPenaltyDto>> Handle(GetRewardsPenaltiesQuery request, CancellationToken ct)
    {
        var data = await _repo.GetAllAsync(request.Month, request.Year);

        return data.Select(r => new RewardPenaltyDto
        {
            Id = r.Id,
            EmployeeId = r.EmployeeId,
            EmployeeName = r.Employee?.Name ?? "Unknown",
            TypeId = r.TypeId,
            TypeName = r.Type?.Name ?? "Unknown",
            Amount = r.Amount,
            CreatedAt = r.CreatedAt
        }).ToList();
    }
}
