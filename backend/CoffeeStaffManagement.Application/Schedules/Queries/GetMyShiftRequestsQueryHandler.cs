using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

public class GetMyShiftRequestsQueryHandler
    : IRequestHandler<GetMyShiftRequestsQuery, List<ScheduleRequestDto>>
{
    private readonly IScheduleRequestRepository _repo;

    public GetMyShiftRequestsQueryHandler(IScheduleRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ScheduleRequestDto>> Handle(
        GetMyShiftRequestsQuery request,
        CancellationToken cancellationToken)
    {
        var data = await _repo.GetByEmployeeAsync(request.EmployeeId);

        return data.Select(x => new ScheduleRequestDto(
            x.Id,
            x.WorkDate,
            x.Shift?.Name ?? "",
            x.Shift?.Position?.Name ?? "",
            (x.Shift?.StartTime ?? TimeSpan.Zero).ToString(@"hh\:mm"),
            (x.Shift?.EndTime ?? TimeSpan.Zero).ToString(@"hh\:mm"),
            x.Status.ToString().ToLower(),
            x.Note
        )).ToList();
    }
}
