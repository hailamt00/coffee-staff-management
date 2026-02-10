using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public class GetShiftRequestsByDateQueryHandler
    : IRequestHandler<GetShiftRequestsByDateQuery, List<AdminShiftRequestDto>>
{
    private readonly IScheduleRequestRepository _repo;

    public GetShiftRequestsByDateQueryHandler(
        IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<AdminShiftRequestDto>> Handle(
        GetShiftRequestsByDateQuery request,
        CancellationToken cancellationToken)
    {
        var data = await _repo.GetByDateAsync(request.Date);

        return data.Select(x => new AdminShiftRequestDto(
            x.Id,
            x.Employee?.Code ?? "",
            x.Employee?.Name ?? "",
            x.Shift?.Name ?? "",
            x.WorkDate,
            x.Status.ToString().ToLower()
        )).ToList();
    }
}
