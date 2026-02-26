using CoffeeStaffManagement.Application.RewardsPenalties.Commands;
using FluentValidation;

namespace CoffeeStaffManagement.Application.RewardsPenalties.Commands;

public class ApplyRewardPenaltyCommandValidator : AbstractValidator<ApplyRewardPenaltyCommand>
{
    public ApplyRewardPenaltyCommandValidator()
    {
        RuleFor(v => v.Request.EmployeeId)
            .GreaterThan(0).WithMessage("Invalid employee ID");

        RuleFor(v => v.Request.TypeId)
            .GreaterThan(0).WithMessage("Invalid reward/penalty type ID");

        RuleFor(v => v.Request.Amount)
            .GreaterThanOrEqualTo(0).WithMessage("Amount must be greater than or equal to zero");

    }
}
