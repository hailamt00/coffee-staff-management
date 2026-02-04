using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;
public class PayrollConfiguration
    : IEntityTypeConfiguration<Payroll>
{
    public void Configure(EntityTypeBuilder<Payroll> builder)
    {
        builder.ToTable("payroll");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.EmployeeId)
            .HasColumnName("employee_id");

        builder.Property(x => x.Month)
            .HasColumnName("month");

        builder.Property(x => x.TotalHours)
            .HasColumnName("total_hours");

        builder.Property(x => x.BaseSalary)
            .HasColumnName("base_salary");

        builder.Property(x => x.TotalSalary)
            .HasColumnName("total_salary");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at");

        builder.HasIndex(x => new { x.EmployeeId, x.Month })
            .IsUnique();
    }
}
