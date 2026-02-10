using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Transaction?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await _context.Transactions
            .FirstOrDefaultAsync(t => t.Id == id, ct);
    }

    public async Task<List<Transaction>> GetByRevenueIdAsync(int revenueId, CancellationToken ct)
    {
        return await _context.Transactions
            .Where(t => t.RevenueId == revenueId)
            .ToListAsync(ct);
    }

    public async Task AddAsync(Transaction transaction, CancellationToken ct)
    {
        await _context.Transactions.AddAsync(transaction, ct);
        await _context.SaveChangesAsync(ct);
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
