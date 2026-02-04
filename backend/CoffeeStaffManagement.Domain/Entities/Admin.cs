namespace CoffeeStaffManagement.Domain.Entities;

public class Admin
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
