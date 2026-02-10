using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ActivityLogger : IActivityLogger
{
    private readonly IActivityLogRepository _repo;

    public ActivityLogger(IActivityLogRepository repo)
    {
        _repo = repo;
    }

    public async Task LogAsync(
        int? userId,
        string action,
        string? entityType,
        int? entityId,
        string? details,
        CancellationToken ct)
    {
        var log = new ActivityLog
        {
            AdminId = userId,
            Action = action,
            TargetType = entityType,
            TargetId = entityId,
            Details = details
        };

        await _repo.AddAsync(log, ct);
    }
}
