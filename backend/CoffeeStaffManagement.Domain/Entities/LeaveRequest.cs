namespace CoffeeStaffManagement.Domain.Entities;

public class LeaveRequest
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public DateOnly FromDate { get; set; }
    public DateOnly ToDate { get; set; }

    public string? Reason { get; set; }
    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
