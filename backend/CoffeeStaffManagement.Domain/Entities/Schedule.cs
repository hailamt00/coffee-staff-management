using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Schedule : BaseEntity
{
    public int EmployeeId { get; set; }
    public int ShiftId { get; set; }

    public DateOnly WorkDate { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Note { get; set; }

    public Employee? Employee { get; set; }
    public Shift? Shift { get; set; }

    public Attendance? Attendance { get; set; }
    public Revenue? Revenue { get; set; }
}
