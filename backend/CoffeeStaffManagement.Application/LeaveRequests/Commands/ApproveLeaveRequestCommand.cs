using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Commands;

public record ApproveLeaveRequestCommand(
    int LeaveRequestId,
    bool Approved
) : IRequest;
