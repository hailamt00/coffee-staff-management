using CoffeeStaffManagement.Domain.Common;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Domain.Entities;

public class ScheduleRequest : AuditableEntity
{
    public int EmployeeId { get; set; }
    public int ShiftId { get; set; }

    public DateOnly WorkDate { get; set; }
    public string? Note { get; set; }
    public ScheduleRequestStatus Status { get; set; } = ScheduleRequestStatus.Pending;

    public Employee? Employee { get; set; }
    public Shift? Shift { get; set; }
}
