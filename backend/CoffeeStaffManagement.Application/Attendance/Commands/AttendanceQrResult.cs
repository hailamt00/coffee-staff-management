namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record AttendanceQrResult (
    string Action,
    string Message,
    int Order
);