using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
{
    public void Configure(EntityTypeBuilder<Shift> builder)
    {
        builder.ToTable("shifts");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.PositionId)
            .HasColumnName("position_id");

        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.StartTime)
            .HasColumnName("start_time");

        builder.Property(x => x.EndTime)
            .HasColumnName("end_time");

        builder.Property(x => x.Status)
            .HasColumnName("status");

        builder.HasIndex(x => new { x.PositionId, x.Name })
            .IsUnique();
    }
}
