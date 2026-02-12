namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IActivityLogger
{
    Task LogAsync(string action, CancellationToken ct);
}
