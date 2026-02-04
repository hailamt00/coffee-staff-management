using CoffeeStaffManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace CoffeeStaffManagement.Infrastructure.Persistence.Configurations;


public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("employees");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Code)
            .HasColumnName("code")
            .HasMaxLength(3)
            .HasDefaultValueSql("LPAD(nextval('employee_code_seq')::TEXT, 3, '0')")
            .ValueGeneratedOnAdd()
            .IsRequired();

        builder.Property(e => e.Name)
            .HasColumnName("name")
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(e => e.Phone)
            .HasColumnName("phone")
            .HasMaxLength(20);

        builder.Property(e => e.Cid)
            .HasColumnName("cid")
            .HasMaxLength(20);

        builder.Property(e => e.Gender)
            .HasColumnName("gender")
            .HasMaxLength(10);

        builder.Property(e => e.SalaryService)
            .HasColumnName("salary_service")
            .HasPrecision(12, 2);

        builder.Property(e => e.SalaryBar)
            .HasColumnName("salary_bar")
            .HasPrecision(12, 2);

        builder.Property(e => e.Dob)
            .HasColumnName("dob");

        builder.Property(e => e.HireDate)
            .HasColumnName("hire_date");

        builder.Property(e => e.CreatedAt)
            .HasColumnName("created_at");
    }
}