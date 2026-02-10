using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Attendance : BaseEntity
{
    public int ScheduleId { get; set; }
    public int EmployeeId { get; set; }

    public DateTime? CheckIn { get; set; }
    public DateTime? CheckOut { get; set; }
    public decimal? TotalHours { get; set; }
    public string? Note { get; set; }

    public Schedule? Schedule { get; set; }
    public Employee? Employee { get; set; }

    public ICollection<PayrollDetail> PayrollDetails { get; set; } = new List<PayrollDetail>();
    public ICollection<RewardPenalty> RewardsPenalties { get; set; } = new List<RewardPenalty>();
}
