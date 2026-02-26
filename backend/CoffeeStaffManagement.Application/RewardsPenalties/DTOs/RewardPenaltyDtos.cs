using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Application.RewardsPenalties.DTOs;

public class RewardPenaltyTypeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!; // "reward" or "penalty"
    public decimal Amount { get; set; }
}

public record CreateRewardPenaltyTypeRequest(
    string Name,
    RewardPenaltyKind Type
);

public class RewardPenaltyDto
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = null!;
    public int TypeId { get; set; }
    public string TypeName { get; set; } = null!;
    public RewardPenaltyKind Kind { get; set; }
    public decimal Amount { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
}

public record ApplyRewardPenaltyRequest(
    int EmployeeId,
    int TypeId,
    decimal Amount,
    string? Reason
);
