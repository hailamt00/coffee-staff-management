namespace CoffeeStaffManagement.Domain.Entities;

public class AttendanceQrLog
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public DateOnly WorkDate { get; set; }

    public string Role { get; set; } = null!;

    public string ActionType { get; set; } = null!;

    public DateTime ActionTime { get; set; }

    public string Phone { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
