using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class PositionConfiguration : IEntityTypeConfiguration<Position>
{
    public void Configure(EntityTypeBuilder<Position> builder)
    {
        builder.ToTable("positions");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .HasColumnName("is_active");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at");

        builder.HasMany(x => x.Shifts)
            .WithOne(x => x.Position)
            .HasForeignKey(x => x.PositionId);
    }
}
