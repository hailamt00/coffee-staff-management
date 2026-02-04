using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Infrastructure.Security;
using CoffeeStaffManagement.Infrastructure.Persistence;
using CoffeeStaffManagement.Infrastructure.Repositories;
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
        // ===== DATABASE =====
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("Default")));

        // ===== REPOSITORIES =====
        services.AddScoped<IAdminRepository, AdminRepository>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<IPositionRepository, PositionRepository>();
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IActivityLogRepository, ActivityLogRepository>();
        services.AddScoped<IActivityLogger, ActivityLogger>();
        services.AddScoped<ILeaveRequestRepository, LeaveRequestRepository>();
        services.AddScoped<IPayrollRepository, PayrollRepository>();
        services.AddScoped<IAttendanceQrRepository,AttendanceQrRepository>();
        services.AddScoped<IPayrollAdjustmentRepository,PayrollAdjustmentRepository>();

        // ===== SECURITY =====
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }
}
