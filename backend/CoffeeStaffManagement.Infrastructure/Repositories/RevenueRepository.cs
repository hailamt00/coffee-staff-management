using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class RevenueRepository : IRevenueRepository
{
    private readonly AppDbContext _context;

    public RevenueRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Revenue?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await _context.Revenues
            .Include(r => r.Transactions)
            .FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    public async Task<Revenue?> GetByScheduleIdAsync(int scheduleId, CancellationToken ct)
    {
        return await _context.Revenues
            .Include(r => r.Transactions)
            .FirstOrDefaultAsync(r => r.ScheduleId == scheduleId, ct);
    }

    public async Task<List<Revenue>> GetByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken ct)
    {
        // Assuming we query by CreatedAt or linked Schedule work date?
        // Revenue is usually daily/shift based.
        // Let's use CreatedAt for now, or join with Schedule for WorkDate if needed.
        // But Revenue has CreatedAt.
        return await _context.Revenues
            .Include(r => r.Transactions)
            .Include(r => r.Schedule)
            .Where(r => r.CreatedAt >= startDate && r.CreatedAt <= endDate)
            .ToListAsync(ct);
    }

    public async Task AddAsync(Revenue revenue, CancellationToken ct)
    {
        await _context.Revenues.AddAsync(revenue, ct);
        await _context.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Revenue revenue, CancellationToken ct)
    {
        _context.Revenues.Update(revenue);
        await _context.SaveChangesAsync(ct);
    }
}
