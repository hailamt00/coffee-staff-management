namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IActivityLogger
{
    Task LogAsync(
        int? userId,
        string action,
        string? entityType,
        int? entityId,
        string? details,
        CancellationToken ct);
}
