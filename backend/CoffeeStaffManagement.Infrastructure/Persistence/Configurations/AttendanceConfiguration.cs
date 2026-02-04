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

        builder.Property(a => a.ShiftId)
            .HasColumnName("shift_id");

        builder.Property(a => a.WorkDate)
            .HasColumnName("work_date");

        builder.Property(a => a.CheckIn)
            .HasColumnName("check_in");

        builder.Property(a => a.CheckOut)
            .HasColumnName("check_out");

        builder.Property(a => a.Status)
            .HasColumnName("status");

        builder.Property(a => a.CreatedAt)
            .HasColumnName("created_at");

        builder.HasOne(a => a.Employee)
            .WithMany()
            .HasForeignKey(a => a.EmployeeId);

        builder.HasOne(a => a.Shift)
            .WithMany(s => s.Attendances)
            .HasForeignKey(a => a.ShiftId);

        builder.HasIndex(a =>
            new { a.EmployeeId, a.ShiftId, a.WorkDate })
            .IsUnique();
    }
}
