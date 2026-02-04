namespace CoffeeStaffManagement.Domain.Entities;

public class Shift
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }

    public ICollection<Attendance> Attendances { get; set; }
        = new List<Attendance>();
}
