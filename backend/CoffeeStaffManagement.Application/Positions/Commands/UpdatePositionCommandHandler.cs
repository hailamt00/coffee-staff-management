using CoffeeStaffManagement.Domain.Entities;
using MediatR;

public class UpdatePositionCommandHandler
    : IRequestHandler<UpdatePositionCommand, PositionDto>
{
    private readonly IPositionRepository _repo;

    public UpdatePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<PositionDto> Handle(
        UpdatePositionCommand request,
        CancellationToken ct)
    {
        var position = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Position not found");

        position.Name = request.Request.Name;

        position.Shifts.Clear();
        foreach (var s in request.Request.Shifts)
        {
            position.Shifts.Add(new Shift
            {
                Name = s.Name,
                StartTime = TimeSpan.Parse(s.StartTime),
                EndTime = TimeSpan.Parse(s.EndTime),
                IsEnabled = s.IsEnabled
            });
        }

        await _repo.UpdateAsync(position);

        return new PositionDto
        {
            Id = position.Id,
            Name = position.Name,
            IsActive = position.IsActive,
            Shifts = position.Shifts.Select(s => new ShiftDto
            {
                Id = s.Id,
                Name = s.Name,
                StartTime = s.StartTime.ToString(@"hh\:mm"),
                EndTime = s.EndTime.ToString(@"hh\:mm"),
                IsEnabled = s.IsEnabled
            }).ToList()
        };
    }
}
