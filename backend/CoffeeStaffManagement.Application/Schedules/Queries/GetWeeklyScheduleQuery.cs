using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public record GetWeeklyScheduleQuery(DateOnly FromDate, DateOnly ToDate)
    : IRequest<List<ScheduleDto>>;
