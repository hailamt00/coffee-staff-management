using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Keeping existing ones:
    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Position> Positions => Set<Position>();
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<Shift> Shifts => Set<Shift>();
    public DbSet<Payroll> Payrolls => Set<Payroll>();

    // New ones:
    public DbSet<RewardPenaltyType> RewardPenaltyTypes => Set<RewardPenaltyType>();
    public DbSet<RewardPenalty> RewardPenalties => Set<RewardPenalty>();
    public DbSet<PayrollDetail> PayrollDetails => Set<PayrollDetail>();
    public DbSet<Revenue> Revenues => Set<Revenue>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();
    public DbSet<Schedule> Schedules => Set<Schedule>();
    public DbSet<ScheduleRequest> ScheduleRequests => Set<ScheduleRequest>();



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}