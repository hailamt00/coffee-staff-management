using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class PayrollDetail : BaseEntity
{
    public int PayrollId { get; set; }
    public int AttendanceId { get; set; }

    public decimal Hours { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount { get; set; }

    public Payroll? Payroll { get; set; }
    public Attendance? Attendance { get; set; }
}
