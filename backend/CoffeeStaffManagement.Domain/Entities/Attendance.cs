namespace CoffeeStaffManagement.Domain.Entities;

public class Attendance
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public int ShiftId { get; set; }
    public Shift Shift { get; set; } = null!;

    public DateOnly WorkDate { get; set; }

    public TimeOnly? CheckIn { get; set; }
    public TimeOnly? CheckOut { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
