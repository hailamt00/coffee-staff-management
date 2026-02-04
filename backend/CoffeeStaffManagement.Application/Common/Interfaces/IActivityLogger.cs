namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IActivityLogger
{
    Task LogAsync(
        int adminId,
        string action,
        string? targetTable,
        int? targetId,
        CancellationToken ct);
}
