using System;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Application.Employees.DTOs
{
    public record EmployeeDto(
        int Id,
        string Code,
        string Name,
        string Phone,
        string? Cid,
        Gender? Gender,
        decimal ServiceSalary,
        decimal BaristaSalary,
        DateOnly? Dob,
        DateOnly HireDate,
        DateTime CreatedAt
    );
}
