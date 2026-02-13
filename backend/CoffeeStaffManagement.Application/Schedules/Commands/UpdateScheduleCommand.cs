using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class UpdateScheduleCommand : IRequest
{
    public int Id { get; set; }
    public int ShiftId { get; set; }
    public DateOnly WorkDate { get; set; }
    public string? Note { get; set; }
}
