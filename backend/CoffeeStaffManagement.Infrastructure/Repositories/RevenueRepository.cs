using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class RevenueRepository : GenericRepository<Revenue>, IRevenueRepository
{
    public RevenueRepository(AppDbContext context) : base(context)
    {
    }

    public new async Task<Revenue?> GetByIdAsync(int id, CancellationToken ct)
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
        return await _context.Revenues
            .Include(r => r.Transactions)
            .Include(r => r.Employee)
            .Include(r => r.Schedule)
                .ThenInclude(s => s!.Shift)
                    .ThenInclude(sh => sh!.Position)
            .Where(r => r.CreatedAt >= startDate && r.CreatedAt <= endDate)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(ct);
    }

    public async Task<List<Revenue>> GetByMonthAsync(int month, int year, CancellationToken ct)
    {
        return await _context.Revenues
            .Include(r => r.Transactions)
            .Include(r => r.Employee)
            .Include(r => r.Schedule)
                .ThenInclude(s => s!.Shift)
                    .ThenInclude(sh => sh!.Position)
            .Where(r => r.CreatedAt.Month == month && r.CreatedAt.Year == year)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(ct);
    }

    public async Task UpdateAsync(Revenue revenue, CancellationToken ct)
    {
        _context.Revenues.Update(revenue);
        await _context.SaveChangesAsync(ct);
    }
}
