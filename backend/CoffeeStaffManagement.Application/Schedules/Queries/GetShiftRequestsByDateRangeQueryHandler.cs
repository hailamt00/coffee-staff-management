using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public class GetShiftRequestsByDateRangeQueryHandler
    : IRequestHandler<GetShiftRequestsByDateRangeQuery, List<AdminShiftRequestDto>>
{
    private readonly IScheduleRequestRepository _repo;

    public GetShiftRequestsByDateRangeQueryHandler(IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<AdminShiftRequestDto>> Handle(
        GetShiftRequestsByDateRangeQuery request,
        CancellationToken cancellationToken)
    {
        var data = await _repo.GetByDateRangeAsync(request.FromDate, request.ToDate);

        return data.Select(x => new AdminShiftRequestDto(
            x.Id,
            x.Employee?.Code ?? "",
            x.Employee?.Name ?? "",
            x.Shift?.Name ?? "",
            x.Shift?.Position?.Name ?? "",
            x.WorkDate,
            x.Status.ToString().ToLower(),
            x.Shift?.StartTime ?? TimeSpan.Zero,
            x.Shift?.EndTime ?? TimeSpan.Zero,
            x.Note
        )).ToList();
    }
}
