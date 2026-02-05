using CoffeeStaffManagement.Application.Common.Interfaces;
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
