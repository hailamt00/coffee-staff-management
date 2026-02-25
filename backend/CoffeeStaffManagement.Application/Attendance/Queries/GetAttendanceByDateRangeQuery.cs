using CoffeeStaffManagement.Application.Attendance.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Queries;

public record GetAttendanceByDateRangeQuery(DateOnly StartDate, DateOnly EndDate)
    : IRequest<List<AttendanceDto>>;
