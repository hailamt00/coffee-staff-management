using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record UpdateAttendanceCommand(
    int AttendanceId,
    DateTime? CheckIn,
    DateTime? CheckOut,
    string? Note) : IRequest;
