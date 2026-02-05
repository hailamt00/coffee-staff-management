using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public record GetShiftRequestsByDateQuery(DateOnly Date)
    : IRequest<List<AdminShiftRequestDto>>;
