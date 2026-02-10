using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IScheduleRequestRepository
{
    Task<List<ScheduleRequest>> GetByEmployeeAsync(long employeeId);
    Task<List<ScheduleRequest>> GetByDateAsync(DateOnly date);
    Task<ScheduleRequest?> GetByIdAsync(long id);
    Task AddAsync(ScheduleRequest request);
    Task UpdateAsync(ScheduleRequest request);
}
