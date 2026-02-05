namespace CoffeeStaffManagement.Domain.Entities;

public class EmployeeShiftRequest
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public int ShiftId { get; set; }
    public DateOnly WorkDate { get; set; }

    public string Status { get; set; } = "PENDING";
    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public Employee Employee { get; set; } = null!;
    public Shift Shift { get; set; } = null!;
}
