using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.ToTable("schedules");

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

        builder.Property(x => x.ApprovedAt)
            .HasColumnName("approved_at");

        builder.Property(x => x.Note)
            .HasColumnName("note");

        builder.HasIndex(x => new { x.EmployeeId, x.ShiftId, x.WorkDate })
            .IsUnique();
    }
}
