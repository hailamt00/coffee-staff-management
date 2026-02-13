using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

public class UpdateShiftRequestCommandHandler
    : IRequestHandler<UpdateShiftRequestCommand>
{
    private readonly IScheduleRequestRepository _repo;

    public UpdateShiftRequestCommandHandler(IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        UpdateShiftRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await _repo.GetByIdAsync(request.Id);
        if (entity == null) return;

        entity.ShiftId = request.ShiftId;
        entity.WorkDate = request.WorkDate;
        entity.Note = request.Note;

        await _repo.UpdateAsync(entity);
    }
}
