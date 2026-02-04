using LeaveEntity = CoffeeStaffManagement.Domain.Entities.LeaveRequest;

namespace CoffeeStaffManagement.Application.Common.Interfaces;
public interface ILeaveRequestRepository
{
    Task AddAsync(LeaveEntity request, CancellationToken ct);
    Task<LeaveEntity?> GetByIdAsync(int id);
    Task<List<LeaveEntity>> GetAllAsync();
    Task UpdateAsync(LeaveEntity request, CancellationToken ct);
}
