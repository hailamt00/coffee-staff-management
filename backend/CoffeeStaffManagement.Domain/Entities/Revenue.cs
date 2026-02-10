using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Revenue : AuditableEntity
{
    public int ScheduleId { get; set; }
    public int EmployeeId { get; set; }

    public decimal OpeningBalance { get; set; }
    public decimal Cash { get; set; }
    public decimal Bank { get; set; }
    public decimal Net { get; set; }

    public decimal TotalRevenue { get; set; } // Rename 'Revenue' to 'TotalRevenue' in C# to avoid collision with class name
    public decimal Deviation { get; set; }

    public string? Note { get; set; }

    public Schedule? Schedule { get; set; }
    public Employee? Employee { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
