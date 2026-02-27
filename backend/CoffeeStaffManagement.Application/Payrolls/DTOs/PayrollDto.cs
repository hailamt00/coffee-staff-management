namespace CoffeeStaffManagement.Application.Payrolls.DTOs;

public class PayrollDto
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeePhone { get; set; } = string.Empty;
    public string PositionName { get; set; } = string.Empty;
    public int Month { get; set; }
    public int Year { get; set; }

    // Summary Fields
    public decimal TotalHours { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal TotalRewards { get; set; }
    public decimal TotalPenalties { get; set; }
    public int TotalLateMinutes { get; set; }

    public decimal TotalSalary { get; set; }
    public DateTime CreatedAt { get; set; }

    public List<PayrollDetailDto> Details { get; set; } = new();
}

public class PayrollDetailDto
{
    public int Id { get; set; }
    public string WorkDate { get; set; } = string.Empty;
    public string ShiftName { get; set; } = string.Empty;
    public string PositionName { get; set; } = string.Empty;
    public string? CheckIn { get; set; }
    public string? CheckOut { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal Hours { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount { get; set; }

    public string? Note { get; set; }
}
