using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class ActivityLog : AuditableEntity
{
    public string Action { get; set; } = null!;
}
