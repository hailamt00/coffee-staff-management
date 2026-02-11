using System;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Application.Employees.DTOs
{
    public class UpdateEmployeeDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public string? Cid { get; set; }
        public Gender? Gender { get; set; }

        public decimal? ServiceSalary { get; set; }
        public decimal? BaristaSalary { get; set; }

        public DateOnly? Dob { get; set; }
        public DateOnly? HireDate { get; set; }
    }
}
