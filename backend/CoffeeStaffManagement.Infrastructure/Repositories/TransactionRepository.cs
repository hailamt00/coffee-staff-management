using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
{
    public TransactionRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<List<Transaction>> GetByRevenueIdAsync(int revenueId, CancellationToken ct)
    {
        return await _context.Transactions
            .Where(t => t.RevenueId == revenueId)
            .ToListAsync(ct);
    }

    public async Task UpdateAsync(Transaction transaction, CancellationToken ct)
    {
        _context.Transactions.Update(transaction);
        await _context.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Transaction transaction, CancellationToken ct)
    {
        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync(ct);
    }
}
