using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Position : BaseEntity
{
    public string Name { get; set; } = null!;
    public bool Status { get; set; } = true;

    public ICollection<Shift> Shifts { get; set; } = new List<Shift>();
}
