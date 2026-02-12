using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Shifts.DTOs;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

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
            Status = true,
            Shifts = new List<Shift>()
        };

        foreach (var shiftDto in request.Request.Shifts)
        {
            position.Shifts.Add(new Shift
            {
                Name = shiftDto.Name,
                StartTime = TimeSpan.Parse(shiftDto.StartTime),
                EndTime = TimeSpan.Parse(shiftDto.EndTime),
                Status = shiftDto.Status,
                IsEnabled = shiftDto.IsEnabled
            });
        }

        await _repo.AddAsync(position);

        return MapToDto(position);
    }

    private static PositionDto MapToDto(Position p)
        => new()
        {
            Id = p.Id,
            Name = p.Name,
            Status = p.Status,
            Shifts = p.Shifts.Select(s => new ShiftDto
            {
                Id = s.Id,
                Name = s.Name ?? "Unknown",
                StartTime = s.StartTime?.ToString(@"hh\:mm") ?? "",
                EndTime = s.EndTime?.ToString(@"hh\:mm") ?? "",
                Status = s.Status,
                IsEnabled = s.IsEnabled
            }).ToList()
        };
}
