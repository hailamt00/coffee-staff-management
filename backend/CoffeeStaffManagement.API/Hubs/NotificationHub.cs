using Microsoft.AspNetCore.SignalR;

namespace CoffeeStaffManagement.API.Hubs;

public class NotificationHub : Hub
{
    // Admins join the "admins" group on connect
    public async Task JoinAdminGroup()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "admins");
    }
}

/// <summary>
/// Strongly-typed client methods that the server can push to connected clients.
/// </summary>
public interface INotificationClient
{
    Task ReceiveNotification(StaffNotificationDto notification);
}

public record StaffNotificationDto(
    string Type,    // "success" | "warning" | "info" | "error"
    string Title,
    string Message,
    DateTime Timestamp
);
