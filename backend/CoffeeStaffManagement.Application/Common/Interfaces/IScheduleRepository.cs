using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IScheduleRepository
{
    Task<List<Schedule>> GetByDateAsync(DateOnly date);
    Task AddAsync(Schedule schedule);
    Task<bool> ExistsAsync(int employeeId, int shiftId, DateOnly workDate);
}
