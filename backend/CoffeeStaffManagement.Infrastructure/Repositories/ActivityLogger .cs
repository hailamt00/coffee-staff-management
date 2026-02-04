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
        int adminId,
        string action,
        string? targetTable,
        int? targetId,
        CancellationToken ct)
    {
        var log = new ActivityLog
        {
            AdminId = adminId,
            Action = action,
            TargetTable = targetTable,
            TargetId = targetId
        };

        await _repo.AddAsync(log, ct);
    }
}
