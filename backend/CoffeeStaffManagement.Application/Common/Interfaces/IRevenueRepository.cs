using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IRevenueRepository : IGenericRepository<Revenue>
{
    new Task<Revenue?> GetByIdAsync(int id, CancellationToken ct);
    Task<Revenue?> GetByScheduleIdAsync(int scheduleId, CancellationToken ct);
    Task<List<Revenue>> GetByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken ct);
    Task<List<Revenue>> GetByMonthAsync(int month, int year, CancellationToken ct);
    Task UpdateAsync(Revenue revenue, CancellationToken ct);
}
