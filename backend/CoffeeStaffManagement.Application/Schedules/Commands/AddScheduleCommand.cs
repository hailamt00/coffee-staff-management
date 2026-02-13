using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public record AddScheduleCommand(
    int EmployeeId,
    List<int> ShiftIds,
    DateOnly WorkDate,
    string? Note
) : IRequest;
