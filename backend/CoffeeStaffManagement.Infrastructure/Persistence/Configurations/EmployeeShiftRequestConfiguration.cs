using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class EmployeeShiftRequestConfiguration
    : IEntityTypeConfiguration<EmployeeShiftRequest>
{
    public void Configure(EntityTypeBuilder<EmployeeShiftRequest> builder)
    {
        builder.ToTable("employee_shift_requests");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.EmployeeId)
            .HasColumnName("employee_id")
            .IsRequired();

        builder.Property(x => x.ShiftId)
            .HasColumnName("shift_id")
            .IsRequired();

        builder.Property(x => x.WorkDate)
            .HasColumnName("work_date")
            .IsRequired();

        builder.Property(x => x.Status)
            .HasColumnName("status")
            .HasMaxLength(20)
            .HasDefaultValue("PENDING");

        builder.Property(x => x.Note)
            .HasColumnName("note");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at");

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId);

        builder.HasOne(x => x.Shift)
            .WithMany()
            .HasForeignKey(x => x.ShiftId);

        builder.HasIndex(x => new { x.EmployeeId, x.ShiftId, x.WorkDate })
            .IsUnique();
    }
}
