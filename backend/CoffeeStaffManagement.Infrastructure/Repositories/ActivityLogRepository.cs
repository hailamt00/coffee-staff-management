using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ActivityLogRepository : GenericRepository<ActivityLog>, IActivityLogRepository
{
    public ActivityLogRepository(AppDbContext context) : base(context)
    {
    }

    public new async Task AddAsync(
        ActivityLog log,
        CancellationToken ct)
    {
        _context.ActivityLogs.Add(log);
        await _context.SaveChangesAsync(ct);
    }
}
