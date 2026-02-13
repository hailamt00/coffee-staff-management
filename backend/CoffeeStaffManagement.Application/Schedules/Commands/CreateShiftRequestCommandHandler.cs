using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

public class CreateShiftRequestCommandHandler
    : IRequestHandler<CreateShiftRequestCommand>
{
    private readonly IScheduleRequestRepository _repo;

    public CreateShiftRequestCommandHandler(IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        CreateShiftRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = new ScheduleRequest
        {
            EmployeeId = request.EmployeeId,
            ShiftId = request.ShiftId,
            WorkDate = request.WorkDate,
            Note = request.Note,
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(entity);
    }


}
