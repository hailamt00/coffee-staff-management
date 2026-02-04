using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;

public class LeaveRequestConfiguration
    : IEntityTypeConfiguration<LeaveRequest>
{
    public void Configure(EntityTypeBuilder<LeaveRequest> builder)
    {
        builder.ToTable("leave_requests");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.EmployeeId)
            .HasColumnName("employee_id");

        builder.Property(x => x.FromDate)
            .HasColumnName("from_date");

        builder.Property(x => x.ToDate)
            .HasColumnName("to_date");

        builder.Property(x => x.Reason)
            .HasColumnName("reason");

        builder.Property(x => x.Status)
            .HasColumnName("status");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId);
    }
}
