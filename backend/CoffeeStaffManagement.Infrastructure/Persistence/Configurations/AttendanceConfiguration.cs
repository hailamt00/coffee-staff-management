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



        builder.HasOne(a => a.Employee)
            .WithMany(e => e.Attendances)
            .HasForeignKey(a => a.EmployeeId);

        builder.HasOne(a => a.Schedule)
            .WithOne(s => s.Attendance)
            .HasForeignKey<Attendance>(a => a.ScheduleId);
    }
}
