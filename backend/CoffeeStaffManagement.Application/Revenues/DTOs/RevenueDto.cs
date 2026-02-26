namespace CoffeeStaffManagement.Application.Revenues.DTOs;

public class RevenueDto
{
    public int Id { get; set; }
    public int ScheduleId { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = null!;
    public string ShiftName { get; set; } = "";
    public string PositionName { get; set; } = "";
    public string WorkDate { get; set; } = "";
    public decimal OpeningBalance { get; set; }
    public decimal Cash { get; set; }
    public decimal Bank { get; set; }
    public decimal Income { get; set; }
    public decimal Expenses { get; set; }
    public decimal Net { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal Deviation { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; }
}
