using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface ITransactionRepository
{
    Task<Transaction?> GetByIdAsync(int id, CancellationToken ct);
    Task<List<Transaction>> GetByRevenueIdAsync(int revenueId, CancellationToken ct);
    Task AddAsync(Transaction transaction, CancellationToken ct);
    Task UpdateAsync(Transaction transaction, CancellationToken ct);
    Task DeleteAsync(Transaction transaction, CancellationToken ct);
}
