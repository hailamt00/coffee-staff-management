using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IScheduleRequestRepository : IGenericRepository<ScheduleRequest>
{
    Task<List<ScheduleRequest>> GetByEmployeeAsync(long employeeId);
    Task<List<ScheduleRequest>> GetByDateAsync(DateOnly date);
    Task<List<ScheduleRequest>> GetByDateRangeAsync(DateOnly fromDate, DateOnly toDate);
    Task<ScheduleRequest?> GetByIdAsync(long id);
    Task AddAsync(ScheduleRequest request);
    Task UpdateAsync(ScheduleRequest request);
    Task DeleteAsync(ScheduleRequest request);
}
