using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record CreateRewardPenaltyTypeCommand(CreateRewardPenaltyTypeRequest Request) : IRequest<int>;

public class CreateRewardPenaltyTypeCommandHandler : IRequestHandler<CreateRewardPenaltyTypeCommand, int>
{
    private readonly IRewardPenaltyRepository _repo;

    public CreateRewardPenaltyTypeCommandHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> Handle(CreateRewardPenaltyTypeCommand request, CancellationToken ct)
    {
        if (request.Request.Amount < 0)
        {
            throw new ArgumentException("Amount must be greater than or equal to 0");
        }

        var type = new RewardPenaltyType
        {
            Name = request.Request.Name,
            Type = request.Request.Type,
            Amount = request.Request.Amount
        };

        await _repo.AddTypeAsync(type);
        return type.Id;
    }
}
