using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IRevenueRepository
{
    Task<Revenue?> GetByIdAsync(int id, CancellationToken ct);
    Task<Revenue?> GetByScheduleIdAsync(int scheduleId, CancellationToken ct);
    Task<List<Revenue>> GetByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken ct);
    Task AddAsync(Revenue revenue, CancellationToken ct);
    Task UpdateAsync(Revenue revenue, CancellationToken ct);
}
