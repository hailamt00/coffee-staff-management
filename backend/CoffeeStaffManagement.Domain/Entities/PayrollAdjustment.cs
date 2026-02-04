namespace CoffeeStaffManagement.Domain.Entities;

public class PayrollAdjustment
{
    public int Id { get; set; }

    public int PayrollId { get; set; }
    public Payroll Payroll { get; set; } = null!;

    public decimal Amount { get; set; }
    public string? Reason { get; set; }

    public DateTime CreatedAt { get; set; }
}
