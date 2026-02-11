using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Infrastructure.Persistence;
using CoffeeStaffManagement.Infrastructure.Repositories;
using CoffeeStaffManagement.Infrastructure.Security;
using CoffeeStaffManagement.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
        // ===== DATABASE =====
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("Default")));

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
        services.AddScoped<IRevenueRepository, RevenueRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IRewardPenaltyRepository, RewardPenaltyRepository>();

        // ===== SECURITY =====
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }
}
