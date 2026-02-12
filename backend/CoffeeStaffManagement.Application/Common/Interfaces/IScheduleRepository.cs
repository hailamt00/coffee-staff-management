using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IScheduleRepository
{
    Task<Schedule?> GetByIdAsync(int id);
    Task<List<Schedule>> GetByDateAsync(DateOnly date);
    Task<Schedule?> GetAsync(int employeeId, int shiftId, DateOnly workDate);
    Task AddAsync(Schedule schedule);
    Task<bool> ExistsAsync(int employeeId, int shiftId, DateOnly workDate);
    Task<List<Schedule>> GetByDateRangeAsync(DateOnly fromDate, DateOnly toDate);
}
