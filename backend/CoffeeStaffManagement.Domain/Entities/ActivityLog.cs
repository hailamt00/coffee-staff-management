namespace CoffeeStaffManagement.Domain.Entities;

public class ActivityLog
{
    public int Id { get; set; }

    public int AdminId { get; set; }
    public Admin Admin { get; set; } = null!;

    public string Action { get; set; } = null!;
    public string? TargetTable { get; set; }
    public int? TargetId { get; set; }

    public DateTime CreatedAt { get; set; }
}
