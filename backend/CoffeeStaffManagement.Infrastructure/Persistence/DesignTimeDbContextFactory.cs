using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration; // Optional if using config
using CoffeeStaffManagement.Infrastructure.Persistence;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Hardcoded for reliability during CLI migration issues.
        // In production, this factory is not used (Startup is used).
        var connectionString = "Host=localhost;Port=5432;Database=csm_db;Username=csm_user;Password=123456";

        optionsBuilder.UseNpgsql(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }
}
