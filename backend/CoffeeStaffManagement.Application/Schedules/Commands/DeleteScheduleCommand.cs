using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Commands;

public class DeleteScheduleCommand : IRequest
{
    public int Id { get; set; }

    public DeleteScheduleCommand(int id)
    {
        Id = id;
    }
}
