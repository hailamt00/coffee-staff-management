using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Shifts.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public class GetPositionsQueryHandler
    : IRequestHandler<GetPositionsQuery, List<PositionDto>>
{
    private readonly IPositionRepository _repo;

    public GetPositionsQueryHandler(IPositionRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<PositionDto>> Handle(
        GetPositionsQuery request,
        CancellationToken cancellationToken)
    {
        var positions = await _repo.GetAllAsync();

        return positions.Select(p => new PositionDto
        {
            Id = p.Id,
            Name = p.Name,
            Status = p.Status,
            Shifts = p.Shifts
                .OrderBy(s => s.StartTime)
                .Select(s => new ShiftDto
                {
                    Id = s.Id,
                    Name = s.Name ?? "Unknown",
                    StartTime = s.StartTime?.ToString(@"hh\:mm") ?? "",
                    EndTime = s.EndTime?.ToString(@"hh\:mm") ?? "",
                    Status = s.Status
                })
                .ToList()
        }).ToList();
    }
}
