using LeaveRequestEntity = CoffeeStaffManagement.Domain.Entities.LeaveRequest;
using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Queries;

public record GetAllLeaveRequestsQuery
    : IRequest<List<LeaveRequestEntity>>;
