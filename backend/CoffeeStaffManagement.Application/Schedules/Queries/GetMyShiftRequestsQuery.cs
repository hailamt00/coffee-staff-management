using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

public record GetMyShiftRequestsQuery(int EmployeeId)
    : IRequest<List<EmployeeShiftRequestDto>>;
