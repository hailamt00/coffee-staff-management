using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record CreateAttendanceCommand(
    int EmployeeId,
    int ShiftId,
    DateOnly WorkDate,
    DateTime? CheckIn,
    DateTime? CheckOut,
    string? Note) : IRequest;
