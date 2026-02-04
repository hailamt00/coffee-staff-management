namespace CoffeeStaffManagement.Domain.Entities;

public class Payroll
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public string Month { get; set; } = null!;

    public decimal TotalHours { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal TotalSalary { get; set; }

    public ICollection<PayrollAdjustment> Adjustments { get; set; }
        = new List<PayrollAdjustment>();

    public DateTime CreatedAt { get; set; }
}
