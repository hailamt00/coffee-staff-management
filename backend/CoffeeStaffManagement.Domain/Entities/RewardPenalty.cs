using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class RewardPenalty : AuditableEntity
{
    public int EmployeeId { get; set; }
    public int? AttendanceId { get; set; }
    public int TypeId { get; set; }

    public decimal Amount { get; set; }
    public string? Reason { get; set; }

    public Employee? Employee { get; set; }
    public Attendance? Attendance { get; set; }
    public RewardPenaltyType? Type { get; set; }
}
