using System;

namespace CoffeeStaffManagement.Application.Employees.DTOs
{
    public class UpdateEmployeeDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public string? Cid { get; set; }
        public string? Gender { get; set; }

        public decimal? SalaryService { get; set; }
        public decimal? SalaryBar { get; set; }

        public DateOnly? Dob { get; set; }
        public DateTime? HireDate { get; set; }
    }
}
