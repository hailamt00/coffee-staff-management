using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public record GetShiftRequestsByDateRangeQuery(DateOnly FromDate, DateOnly ToDate)
    : IRequest<List<AdminShiftRequestDto>>;
