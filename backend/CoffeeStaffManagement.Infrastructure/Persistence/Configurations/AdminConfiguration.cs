using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class AdminConfiguration : IEntityTypeConfiguration<Admin>
{
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
        builder.ToTable("admins");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasColumnName("id");

        builder.Property(a => a.Username)
            .HasColumnName("username")
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(a => a.Username)
            .IsUnique();

        builder.Property(a => a.PasswordHash)
            .HasColumnName("password_hash")
            .IsRequired();

        builder.Property(a => a.CreatedAt)
            .HasColumnName("created_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}
