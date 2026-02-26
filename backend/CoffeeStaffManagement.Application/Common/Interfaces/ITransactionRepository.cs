using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface ITransactionRepository : IGenericRepository<Transaction>
{
    Task<List<Transaction>> GetByRevenueIdAsync(int revenueId, CancellationToken ct);
}
