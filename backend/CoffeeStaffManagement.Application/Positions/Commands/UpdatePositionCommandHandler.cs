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
            ?? throw new KeyNotFoundException("Position not found");

        position.Name = request.Request.Name;
        // position.Status = request.Request.IsActive; // If Request has IsActive? Check properties. Assuming validation only for Name/Shifts based on code.

        var incomingShiftIds = request.Request.Shifts.Where(s => s.Id.HasValue).Select(s => s.Id!.Value).ToList();

        var shiftsToRemove = position.Shifts.Where(s => !incomingShiftIds.Contains(s.Id)).ToList();
        foreach (var shift in shiftsToRemove)
        {
            // We soft-delete removed shifts to avoid breaking existing foreign key constraints gracefully.
            // A more robust system would check if they are in-use, but this solves the immediate 500 error on update.
            shift.IsEnabled = false;
            shift.Status = false;
        }

        foreach (var s in request.Request.Shifts)
        {
            if (s.Id.HasValue && s.Id.Value > 0)
            {
                var existing = position.Shifts.FirstOrDefault(x => x.Id == s.Id.Value);
                if (existing != null)
                {
                    existing.Name = s.Name;
                    existing.StartTime = TimeSpan.Parse(s.StartTime);
                    existing.EndTime = TimeSpan.Parse(s.EndTime);
                    existing.Status = s.Status;
                    existing.IsEnabled = s.IsEnabled;
                }
            }
            else
            {
                position.Shifts.Add(new Shift
                {
                    Name = s.Name,
                    StartTime = TimeSpan.Parse(s.StartTime),
                    EndTime = TimeSpan.Parse(s.EndTime),
                    Status = s.Status,
                    IsEnabled = s.IsEnabled
                });
            }
        }

        _repo.Update(position);
        await _repo.SaveChangesAsync(ct);

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
                Status = s.Status,
                IsEnabled = s.IsEnabled
            }).ToList()
        };
    }
}
