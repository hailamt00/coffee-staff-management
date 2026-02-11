using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Queries;

public record GetEmployeeRewardsPenaltiesQuery(int EmployeeId, int Month, int Year) : IRequest<List<RewardPenaltyDto>>;

public class GetEmployeeRewardsPenaltiesQueryHandler : IRequestHandler<GetEmployeeRewardsPenaltiesQuery, List<RewardPenaltyDto>>
{
    private readonly IRewardPenaltyRepository _repo;

    public GetEmployeeRewardsPenaltiesQueryHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RewardPenaltyDto>> Handle(GetEmployeeRewardsPenaltiesQuery request, CancellationToken ct)
    {
        var data = await _repo.GetByEmployeeIdAsync(request.EmployeeId, request.Month, request.Year);

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
