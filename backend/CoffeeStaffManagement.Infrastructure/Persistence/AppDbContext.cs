using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Position> Positions => Set<Position>();
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<Shift> Shifts => Set<Shift>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<Payroll> Payrolls => Set<Payroll>();
    public DbSet<PayrollAdjustment> PayrollAdjustments => Set<PayrollAdjustment>();
    public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();
    public DbSet<AttendanceQrLog> AttendanceQrLogs => Set<AttendanceQrLog>();
    public DbSet<Schedule> Schedules => Set<Schedule>();
    public DbSet<EmployeeShiftRequest> EmployeeShiftRequests => Set<EmployeeShiftRequest>();



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}