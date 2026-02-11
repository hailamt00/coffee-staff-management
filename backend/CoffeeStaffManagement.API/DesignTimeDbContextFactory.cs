using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CoffeeStaffManagement.API;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Hardcoded for reliability during CLI migration issues.
        // In production, this factory is not used (Startup is used).
        var connectionString = "Host=localhost;Port=5432;Database=csm_db;Username=csm_user;Password=123456";

        optionsBuilder.UseNpgsql(connectionString)
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.ManyServiceProvidersCreatedWarning));

        return new AppDbContext(optionsBuilder.Options);
    }
}
