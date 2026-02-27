using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record UpdateRewardPenaltyCommand(int Id, UpdateRewardPenaltyRequest Request) : IRequest<Unit>;

public class UpdateRewardPenaltyCommandHandler : IRequestHandler<UpdateRewardPenaltyCommand, Unit>
{
    private readonly IRewardPenaltyRepository _repo;
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public UpdateRewardPenaltyCommandHandler(
        IRewardPenaltyRepository repo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _repo = repo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(UpdateRewardPenaltyCommand request, CancellationToken ct)
    {
        if (request.Request.Amount < 0)
        {
            throw new ArgumentException("Amount must be greater than or equal to 0");
        }

        var adjustment = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException("Adjustment not found");

        adjustment.Amount = request.Request.Amount;
        adjustment.Reason = string.IsNullOrWhiteSpace(request.Request.Reason)
            ? null
            : request.Request.Reason.Trim();

        _repo.Update(adjustment);
        await _repo.SaveChangesAsync(ct);

        await _logger.LogAsync(
            $"Update RewardPenalty #{adjustment.Id} - user: {_currentUserService.UserId}",
            ct);

        return Unit.Value;
    }
}
