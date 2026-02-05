namespace CoffeeStaffManagement.Domain.Entities;

public class Shift
{
    public int Id { get; set; }

    public int PositionId { get; set; }
    public Position Position { get; set; } = null!;

    public string Name { get; set; } = null!;
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }

    public bool IsEnabled { get; set; } = true;
    public ICollection<Attendance> Attendances { get; set; }
        = new List<Attendance>();
}
