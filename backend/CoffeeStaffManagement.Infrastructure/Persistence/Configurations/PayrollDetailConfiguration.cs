using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class PayrollDetailConfiguration : IEntityTypeConfiguration<PayrollDetail>
{
    public void Configure(EntityTypeBuilder<PayrollDetail> builder)
    {
        builder.ToTable("payroll_details");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.PayrollId).HasColumnName("payroll_id");
        builder.Property(x => x.AttendanceId).HasColumnName("attendance_id");
        builder.Property(x => x.Hours).HasColumnName("hours").HasPrecision(5, 2);
        builder.Property(x => x.Rate).HasColumnName("rate").HasPrecision(12, 2);
        builder.Property(x => x.Amount).HasColumnName("amount").HasPrecision(12, 2);

        builder.HasOne(x => x.Payroll).WithMany(p => p.Details).HasForeignKey(x => x.PayrollId);
        builder.HasOne(x => x.Attendance).WithMany(a => a.PayrollDetails).HasForeignKey(x => x.AttendanceId);
    }
}
