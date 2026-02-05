namespace CoffeeStaffManagement.Domain.Entities;

public class Schedule
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public int ShiftId { get; set; }
    public DateOnly WorkDate { get; set; }

    public int? ApprovedBy { get; set; }
    public DateTime ApprovedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public Employee Employee { get; set; } = null!;
    public Shift Shift { get; set; } = null!;
}
