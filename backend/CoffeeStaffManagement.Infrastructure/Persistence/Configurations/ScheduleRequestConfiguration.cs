using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class ScheduleRequestConfiguration
    : IEntityTypeConfiguration<ScheduleRequest>
{
    public void Configure(EntityTypeBuilder<ScheduleRequest> builder)
    {
        builder.ToTable("schedule_requests");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.EmployeeId)
            .HasColumnName("employee_id");

        builder.Property(e => e.ShiftId)
            .HasColumnName("shift_id");

        builder.Property(e => e.WorkDate)
            .HasColumnName("work_date");

        builder.Property(e => e.Status)
            .HasColumnName("status")
            .HasConversion<string>()
            .HasDefaultValue(ScheduleRequestStatus.Pending);

        builder.Property(e => e.Note)
            .HasColumnName("note");

        builder.Property(e => e.CreatedAt)
            .HasColumnName("created_at");

        builder.HasOne(e => e.Employee)
            .WithMany(em => em.ScheduleRequests)
            .HasForeignKey(e => e.EmployeeId);

        builder.HasOne(e => e.Shift)
            .WithMany(s => s.ScheduleRequests)
            .HasForeignKey(e => e.ShiftId);

        builder.HasIndex(x => new { x.EmployeeId, x.ShiftId, x.WorkDate })
            .IsUnique();
    }
}
