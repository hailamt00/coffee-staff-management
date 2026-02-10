using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        // Try to find the API project directory
        var currentDir = Directory.GetCurrentDirectory();
        var apiPath = Path.Combine(currentDir, "CoffeeStaffManagement.API");

        // If not found in current dir, check if we are in Infrastructure and need to go up
        if (!Directory.Exists(apiPath))
        {
            var parent = Directory.GetParent(currentDir);
            if (parent != null)
            {
                apiPath = Path.Combine(parent.FullName, "CoffeeStaffManagement.API");
            }
        }

        var configuration = new ConfigurationBuilder()
            .SetBasePath(apiPath)
            .AddJsonFile("appsettings.json")
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString = "Host=localhost;Port=5432;Database=csm_db;Username=csm_user;Password=123456";

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }
}
