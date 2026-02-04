using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Commands;
public record CreateLeaveRequestCommand(
    int EmployeeId,
    DateOnly FromDate,
    DateOnly ToDate,
    string? Reason
) : IRequest;
