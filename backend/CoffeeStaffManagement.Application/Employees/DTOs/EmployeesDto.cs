using System;

namespace CoffeeStaffManagement.Application.Employees.DTOs
{
    public record EmployeeDto(
        int Id,
        string Code,
        string Name,
        string Phone,
        string? Cid,
        string? Gender,
        decimal SalaryService,
        decimal SalaryBar,
        DateOnly? Dob,
        DateTime HireDate,
        DateTime CreatedAt
    );
}
