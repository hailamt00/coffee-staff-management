using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public record ApplyRewardPenaltyCommand(ApplyRewardPenaltyRequest Request) : IRequest<int>;

public class ApplyRewardPenaltyCommandHandler : IRequestHandler<ApplyRewardPenaltyCommand, int>
{
    private readonly IRewardPenaltyRepository _rewardPenaltyRepo;
    private readonly IEmployeeRepository _employeeRepo;
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public ApplyRewardPenaltyCommandHandler(
        IRewardPenaltyRepository rewardPenaltyRepo,
        IEmployeeRepository employeeRepo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _rewardPenaltyRepo = rewardPenaltyRepo;
        _employeeRepo = employeeRepo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<int> Handle(ApplyRewardPenaltyCommand request, CancellationToken ct)
    {
        var employee = await _employeeRepo.GetByIdAsync(request.Request.EmployeeId)
            ?? throw new KeyNotFoundException("Employee not found");

        var rpType = await _rewardPenaltyRepo.GetTypeByIdAsync(request.Request.TypeId)
            ?? throw new KeyNotFoundException("Reward/Penalty type not found");

        var rewardPenalty = new RewardPenalty
        {
            EmployeeId = request.Request.EmployeeId,
            TypeId = request.Request.TypeId,
            Amount = request.Request.Amount
        };

        await _rewardPenaltyRepo.AddAsync(rewardPenalty);

        await _logger.LogAsync(
            $"Apply RewardPenalty: {rpType.Name} for {employee.Name}: {rewardPenalty.Amount:N0} VND - user: {_currentUserService.UserId}",
            ct);

        return rewardPenalty.Id;
    }
}
