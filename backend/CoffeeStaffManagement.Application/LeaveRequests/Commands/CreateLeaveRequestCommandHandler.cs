using CoffeeStaffManagement.Application.Common.Interfaces;
using LeaveRequestEntity = CoffeeStaffManagement.Domain.Entities.LeaveRequest;
using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Commands;

public class CreateLeaveRequestCommandHandler
    : IRequestHandler<CreateLeaveRequestCommand>
{
    private readonly ILeaveRequestRepository _repo;

    public CreateLeaveRequestCommandHandler(
        ILeaveRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        CreateLeaveRequestCommand request,
        CancellationToken ct)
    {
        var leave = new LeaveRequestEntity
        {
            EmployeeId = request.EmployeeId,
            FromDate = request.FromDate,
            ToDate = request.ToDate,
            Reason = request.Reason
        };

        await _repo.AddAsync(leave, ct);
    }
}
