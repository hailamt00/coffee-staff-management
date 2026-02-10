using CoffeeStaffManagement.Domain.Common;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Domain.Entities;

public class RewardPenaltyType : BaseEntity
{
    public string Name { get; set; } = null!;
    public RewardPenaltyKind Type { get; set; }
    public ICollection<RewardPenalty> RewardsPenalties { get; set; } = new List<RewardPenalty>();
}
