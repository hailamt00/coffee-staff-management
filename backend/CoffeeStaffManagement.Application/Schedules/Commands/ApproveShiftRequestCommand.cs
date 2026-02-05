using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public record ApproveShiftRequestCommand(
    int RequestId,
    bool IsApproved,
    int ApprovedBy
) : IRequest;
