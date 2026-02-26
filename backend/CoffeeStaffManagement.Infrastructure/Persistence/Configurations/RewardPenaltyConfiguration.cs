using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class RewardPenaltyConfiguration : IEntityTypeConfiguration<RewardPenalty>
{
    public void Configure(EntityTypeBuilder<RewardPenalty> builder)
    {
        builder.ToTable("rewards_penalties_v2");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.EmployeeId).HasColumnName("employee_id");
        builder.Property(x => x.AttendanceId).HasColumnName("attendance_id");
        builder.Property(x => x.TypeId).HasColumnName("type_id");
        builder.Property(x => x.Amount).HasColumnName("amount").HasPrecision(12, 2);
        builder.Property(x => x.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        builder.Property(x => x.Reason).HasColumnName("reason");

        builder.HasOne(x => x.Employee).WithMany(e => e.RewardsPenalties).HasForeignKey(x => x.EmployeeId);
        builder.HasOne(x => x.Attendance).WithMany(a => a.RewardsPenalties).HasForeignKey(x => x.AttendanceId).IsRequired(false);
        builder.HasOne(x => x.Type).WithMany(t => t.RewardsPenalties).HasForeignKey(x => x.TypeId);
    }
}
