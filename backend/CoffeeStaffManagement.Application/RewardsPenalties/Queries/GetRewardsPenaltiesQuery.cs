using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Queries;

public record GetRewardsPenaltiesQuery(int Month, int Year) : IRequest<List<RewardPenaltyDto>>;
