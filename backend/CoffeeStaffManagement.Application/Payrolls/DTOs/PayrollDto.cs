namespace CoffeeStaffManagement.Application.Payrolls.DTOs;

public class PayrollDto
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public int Month { get; set; }
    public int Year { get; set; }
    public decimal TotalSalary { get; set; }
    public DateTime CreatedAt { get; set; }
}
