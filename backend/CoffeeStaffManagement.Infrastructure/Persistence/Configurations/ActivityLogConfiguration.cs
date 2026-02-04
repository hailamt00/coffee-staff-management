using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class ActivityLogConfiguration
    : IEntityTypeConfiguration<ActivityLog>
{
    public void Configure(EntityTypeBuilder<ActivityLog> builder)
    {
        builder.ToTable("activity_logs");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.AdminId)
            .HasColumnName("admin_id");

        builder.Property(x => x.Action)
            .HasColumnName("action");

        builder.Property(x => x.TargetTable)
            .HasColumnName("target_table");

        builder.Property(x => x.TargetId)
            .HasColumnName("target_id");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        builder.HasOne(x => x.Admin)
            .WithMany()
            .HasForeignKey(x => x.AdminId);
    }
}
