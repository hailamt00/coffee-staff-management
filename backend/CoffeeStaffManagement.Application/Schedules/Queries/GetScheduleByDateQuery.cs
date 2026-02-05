using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public record GetScheduleByDateQuery(DateOnly Date)
    : IRequest<List<ScheduleDto>>;
