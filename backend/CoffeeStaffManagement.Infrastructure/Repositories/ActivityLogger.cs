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

    public async Task LogAsync(string action, CancellationToken ct)
    {
        var log = new ActivityLog
        {
            Action = action
        };

        await _repo.AddAsync(log, ct);
    }
}
