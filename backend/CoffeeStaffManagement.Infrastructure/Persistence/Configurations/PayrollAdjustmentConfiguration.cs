using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class PayrollAdjustmentConfiguration
    : IEntityTypeConfiguration<PayrollAdjustment>
{
    public void Configure(EntityTypeBuilder<PayrollAdjustment> builder)
    {
        builder.ToTable("payroll_adjustments");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.PayrollId)
            .HasColumnName("payroll_id");

        builder.Property(x => x.Amount)
            .HasColumnName("amount");

        builder.Property(x => x.Reason)
            .HasColumnName("reason");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        builder.HasOne(x => x.Payroll)
            .WithMany(p => p.Adjustments)
            .HasForeignKey(x => x.PayrollId);
    }
}
