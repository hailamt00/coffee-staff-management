using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Payroll : AuditableEntity
{
    public int EmployeeId { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public decimal TotalSalary { get; set; }

    public Employee? Employee { get; set; }
    public ICollection<PayrollDetail> Details { get; set; } = new List<PayrollDetail>();
}
