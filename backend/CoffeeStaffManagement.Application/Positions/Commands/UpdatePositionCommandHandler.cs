using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Shifts.DTOs;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

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
        // position.Status = request.Request.IsActive; // If Request has IsActive? Check properties. Assuming validation only for Name/Shifts based on code.

        position.Shifts.Clear();
        foreach (var s in request.Request.Shifts)
        {
            position.Shifts.Add(new Shift
            {
                Name = s.Name,
                StartTime = TimeSpan.Parse(s.StartTime),
                EndTime = TimeSpan.Parse(s.EndTime),
                Status = s.Status // Was IsEnabled
            });
        }

        await _repo.UpdateAsync(position);

        return new PositionDto
        {
            Id = position.Id,
            Name = position.Name,
            Status = position.Status,
            Shifts = position.Shifts.Select(s => new ShiftDto
            {
                Id = s.Id,
                Name = s.Name ?? "Unknown",
                StartTime = s.StartTime?.ToString(@"hh\:mm") ?? "",
                EndTime = s.EndTime?.ToString(@"hh\:mm") ?? "",
                Status = s.Status
            }).ToList()
        };
    }
}
