using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record DeleteRewardPenaltyCommand(int Id) : IRequest<Unit>;

public class DeleteRewardPenaltyCommandHandler : IRequestHandler<DeleteRewardPenaltyCommand, Unit>
{
    private readonly IRewardPenaltyRepository _repo;
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public DeleteRewardPenaltyCommandHandler(
        IRewardPenaltyRepository repo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _repo = repo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(DeleteRewardPenaltyCommand request, CancellationToken ct)
    {
        var adjustment = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException("Adjustment not found");

        _repo.Delete(adjustment);
        await _repo.SaveChangesAsync(ct);

        await _logger.LogAsync(
            $"Delete RewardPenalty #{request.Id} - user: {_currentUserService.UserId}",
            ct);

        return Unit.Value;
    }
}
