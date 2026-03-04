using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record UpdateAttendanceCommand(
    int AttendanceId,
    int? EmployeeId,
    int? ShiftId,
    DateOnly? WorkDate,
    DateTime? CheckIn,
    DateTime? CheckOut,
    string? Note) : IRequest;
