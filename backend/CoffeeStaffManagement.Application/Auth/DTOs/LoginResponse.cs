namespace CoffeeStaffManagement.Application.Auth.DTOs;

public class LoginResponse
{
    public string Token { get; set; } = null!;
    public string RefreshToken { get; set; } = ""; // Placeholder for now
    public AdminDto Admin { get; set; } = null!;
}

public class AdminDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Role { get; set; } = "Admin";
}
