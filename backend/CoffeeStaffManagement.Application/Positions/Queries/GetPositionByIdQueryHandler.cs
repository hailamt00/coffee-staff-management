using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Shifts.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public class GetPositionByIdQueryHandler
    : IRequestHandler<GetPositionByIdQuery, PositionDto?>
{
    private readonly IPositionRepository _repo;

    public GetPositionByIdQueryHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<PositionDto?> Handle(
        GetPositionByIdQuery request,
        CancellationToken cancellationToken)
    {
        var position = await _repo.GetByIdAsync(request.Id);

        if (position is null)
            return null;

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
