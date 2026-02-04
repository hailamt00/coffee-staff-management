namespace CoffeeStaffManagement.Application.Attendance.DTOs;

public class CheckInRequest
{
    public int EmployeeId { get; set; }
    public int ShiftId { get; set; }
    public DateOnly WorkDate { get; set; }
}
