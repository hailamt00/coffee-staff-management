using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class RevenueConfiguration : IEntityTypeConfiguration<Revenue>
{
    public void Configure(EntityTypeBuilder<Revenue> builder)
    {
        builder.ToTable("revenues");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.ScheduleId).HasColumnName("schedule_id");
        builder.Property(x => x.EmployeeId).HasColumnName("employee_id");

        builder.Property(x => x.OpeningBalance).HasColumnName("opening_balance").HasPrecision(12, 2);
        builder.Property(x => x.Cash).HasColumnName("cash").HasPrecision(12, 2);
        builder.Property(x => x.Bank).HasColumnName("bank").HasPrecision(12, 2);
        builder.Property(x => x.Net).HasColumnName("net").HasPrecision(12, 2);
        builder.Property(x => x.TotalRevenue).HasColumnName("revenue").HasPrecision(12, 2);
        builder.Property(x => x.Deviation).HasColumnName("deviation").HasPrecision(12, 2);
        
        builder.Property(x => x.Note).HasColumnName("note");
        builder.Property(x => x.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");

        builder.HasOne(x => x.Schedule).WithMany().HasForeignKey(x => x.ScheduleId);
        builder.HasOne(x => x.Employee).WithMany().HasForeignKey(x => x.EmployeeId);
    }
}
