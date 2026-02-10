using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class ActivityLog : AuditableEntity
{
    public int? AdminId { get; set; }
    public string Action { get; set; } = null!;
    public string? TargetType { get; set; }
    public int? TargetId { get; set; }
    public string? Details { get; set; }

    public Admin? Admin { get; set; }
}
