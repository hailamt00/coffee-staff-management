using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record DeleteAttendanceCommand(int AttendanceId) : IRequest;
