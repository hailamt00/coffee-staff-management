using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Infrastructure.Persistence;
using CoffeeStaffManagement.Infrastructure.Repositories;
using CoffeeStaffManagement.Infrastructure.Security;
using CoffeeStaffManagement.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace CoffeeStaffManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // ===== DATABASE =====
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(configuration.GetConnectionString("Default"));
        dataSourceBuilder.EnableDynamicJson();

        var dataSource = dataSourceBuilder.Build();
        services.AddSingleton(dataSource);

        services.AddDbContext<AppDbContext>((sp, options) =>
        {
            var ds = sp.GetRequiredService<NpgsqlDataSource>();
            options.UseNpgsql(ds);
        });

        // ===== REPOSITORIES =====
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IAdminRepository, AdminRepository>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<IPositionRepository, PositionRepository>();
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IActivityLogRepository, ActivityLogRepository>();
        services.AddScoped<IActivityLogger, ActivityLogger>();
        services.AddScoped<IPayrollRepository, PayrollRepository>();
        services.AddScoped<IScheduleRequestRepository, ScheduleRequestRepository>();
        services.AddScoped<IScheduleRepository, ScheduleRepository>();
        services.AddScoped<IShiftRepository, ShiftRepository>();
        services.AddScoped<IRevenueRepository, RevenueRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IRewardPenaltyRepository, RewardPenaltyRepository>();

        // ===== SECURITY =====
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }
}
