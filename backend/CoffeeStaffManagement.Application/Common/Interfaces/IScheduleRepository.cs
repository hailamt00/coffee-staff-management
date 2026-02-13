using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IScheduleRepository
{
    Task<Schedule?> GetByIdAsync(int id);
    Task<List<Schedule>> GetByDateAsync(DateOnly date);
    Task<Schedule?> GetAsync(int employeeId, int shiftId, DateOnly workDate);
    Task AddAsync(Schedule schedule);
    Task UpdateAsync(Schedule schedule);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int employeeId, int shiftId, DateOnly workDate);
    Task<List<Schedule>> GetByDateRangeAsync(DateOnly fromDate, DateOnly toDate);
    Task<List<Schedule>> GetByEmployeeAndDateAsync(int employeeId, DateOnly date);
}
