using ActivityLogEntity = CoffeeStaffManagement.Domain.Entities.ActivityLog;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IActivityLogRepository : IGenericRepository<ActivityLogEntity>
{
    new Task AddAsync(ActivityLogEntity log, CancellationToken ct);
}
