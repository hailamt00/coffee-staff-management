using ActivityLogEntity = CoffeeStaffManagement.Domain.Entities.ActivityLog;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IActivityLogRepository
{
    Task AddAsync(ActivityLogEntity log, CancellationToken ct);
}
