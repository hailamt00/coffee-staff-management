using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Activity : AuditableEntity
{
    public string Action { get; set; } = null!;
}
