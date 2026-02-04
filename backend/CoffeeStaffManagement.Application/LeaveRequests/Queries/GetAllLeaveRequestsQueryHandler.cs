using CoffeeStaffManagement.Application.Common.Interfaces;
using LeaveRequestEntity = CoffeeStaffManagement.Domain.Entities.LeaveRequest;
using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Queries;

public class GetAllLeaveRequestsQueryHandler
    : IRequestHandler<GetAllLeaveRequestsQuery, List<LeaveRequestEntity>>
{
    private readonly ILeaveRequestRepository _repo;

    public GetAllLeaveRequestsQueryHandler(ILeaveRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<LeaveRequestEntity>> Handle(
        GetAllLeaveRequestsQuery request,
        CancellationToken ct)
    {
        return await _repo.GetAllAsync();
    }
}
