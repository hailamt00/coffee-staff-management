using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context, IPasswordHasher hasher)
    {


        var admin = context.Admins.FirstOrDefault(a => a.Username == "admin");
        if (admin != null)
        {
            // Check if password is plain text "123456" (from SQL seed) or invalid
            // BCrypt hashes start with $2a$, $2b$, or $2y$.
            if (admin.PasswordHash == "123456" || !admin.PasswordHash.StartsWith("$"))
            {
                admin.PasswordHash = hasher.Hash("123456");
                context.SaveChanges();
            }
        }
    }
}
