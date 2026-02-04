using CoffeeStaffManagement.Application.Attendance.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Queries;

public record GetAttendanceByDateQuery(DateOnly Date)
    : IRequest<List<AttendanceDto>>;
