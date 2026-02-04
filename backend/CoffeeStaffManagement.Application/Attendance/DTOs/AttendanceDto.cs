namespace CoffeeStaffManagement.Application.Attendance.DTOs;

public class AttendanceDto
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = null!;

    public int ShiftId { get; set; }
    public string ShiftName { get; set; } = null!;

    public DateOnly WorkDate { get; set; }

    public TimeOnly? CheckIn { get; set; }
    public TimeOnly? CheckOut { get; set; }

    public string Status { get; set; } = null!;
}
