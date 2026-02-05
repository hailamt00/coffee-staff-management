using CoffeeStaffManagement.Domain.Entities;
using MediatR;

public class CreatePositionCommandHandler
    : IRequestHandler<CreatePositionCommand, PositionDto>
{
    private readonly IPositionRepository _repo;

    public CreatePositionCommandHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<PositionDto> Handle(
        CreatePositionCommand request,
        CancellationToken ct)
    {
        var position = new Position
        {
            Name = request.Request.Name,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            Shifts = request.Request.Shifts.Select(s => new Shift
            {
                Name = s.Name,
                StartTime = TimeSpan.Parse(s.StartTime),
                EndTime = TimeSpan.Parse(s.EndTime),
                IsEnabled = s.IsEnabled
            }).ToList()
        };

        await _repo.AddAsync(position);

        return MapToDto(position);
    }

    private static PositionDto MapToDto(Position p)
        => new()
        {
            Id = p.Id,
            Name = p.Name,
            IsActive = p.IsActive,
            Shifts = p.Shifts.Select(s => new ShiftDto
            {
                Id = s.Id,
                Name = s.Name,
                StartTime = s.StartTime.ToString(@"hh\:mm"),
                EndTime = s.EndTime.ToString(@"hh\:mm"),
                IsEnabled = s.IsEnabled
            }).ToList()
        };
}
