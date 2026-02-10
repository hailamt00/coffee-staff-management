using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record DeleteRewardPenaltyTypeCommand(int Id) : IRequest<Unit>;

public class DeleteRewardPenaltyTypeCommandHandler : IRequestHandler<DeleteRewardPenaltyTypeCommand, Unit>
{
    private readonly IRewardPenaltyRepository _repo;

    public DeleteRewardPenaltyTypeCommandHandler(IRewardPenaltyRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(DeleteRewardPenaltyTypeCommand request, CancellationToken ct)
    {
        var type = await _repo.GetTypeByIdAsync(request.Id)
            ?? throw new Exception("Reward/Penalty type not found");

        await _repo.DeleteTypeAsync(type);
        return Unit.Value;
    }
}
