namespace CoffeeStaffManagement.Domain.Entities;

public class Position
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    public ICollection<Shift> Shifts { get; set; } = new List<Shift>();
}
