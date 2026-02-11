using CoffeeStaffManagement.Domain.Common;

namespace CoffeeStaffManagement.Domain.Entities;

public class Shift : BaseEntity
{
    public int PositionId { get; set; }

    public string? Name { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }

    public bool Status { get; set; } = true;
    public bool IsEnabled { get; set; } = true;

    public Position? Position { get; set; }
    public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
    public ICollection<ScheduleRequest> ScheduleRequests { get; set; } = new List<ScheduleRequest>();
}
