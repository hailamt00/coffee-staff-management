using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CoffeeStaffManagement.Infrastructure.Persistence;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class AttendanceConfiguration
    : IEntityTypeConfiguration<Attendance>
{
    public void Configure(EntityTypeBuilder<Attendance> builder)
    {
        builder.ToTable("attendance");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasColumnName("id");

        builder.Property(a => a.EmployeeId)
            .HasColumnName("employee_id");

        builder.Property(a => a.ScheduleId)
            .HasColumnName("schedule_id");

        builder.Property(a => a.TotalHours)
            .HasColumnName("total_hours")
            .HasPrecision(5, 2);

        builder.Property(a => a.Note)
            .HasColumnName("note");

        builder.Property(a => a.CheckIn)
            .HasColumnName("check_in");

        builder.Property(a => a.CheckOut)
            .HasColumnName("check_out");

        // builder.Property(a => a.CreatedAt)
        //     .HasColumnName("created_at");

        builder.HasOne(a => a.Employee)
            .WithMany()
            .HasForeignKey(a => a.EmployeeId);

        builder.HasOne(a => a.Schedule)
            .WithMany()
            .HasForeignKey(a => a.ScheduleId);
    }
}
