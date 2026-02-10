using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record UpdateRewardPenaltyTypeCommand(int Id, CreateRewardPenaltyTypeRequest Request) : IRequest<Unit>;

public class UpdateRewardPenaltyTypeCommandHandler : IRequestHandler<UpdateRewardPenaltyTypeCommand, Unit>
{
    private readonly IRewardPenaltyRepository _repo;

    public UpdateRewardPenaltyTypeCommandHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(UpdateRewardPenaltyTypeCommand request, CancellationToken ct)
    {
        var type = await _repo.GetTypeByIdAsync(request.Id)
            ?? throw new Exception("Reward/Penalty type not found");

        type.Name = request.Request.Name;
        type.Type = request.Request.Type;

        await _repo.UpdateTypeAsync(type);
        return Unit.Value;
    }
}
