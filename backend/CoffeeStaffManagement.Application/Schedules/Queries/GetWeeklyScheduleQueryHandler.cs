using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public class GetWeeklyScheduleQueryHandler
    : IRequestHandler<GetWeeklyScheduleQuery, List<ScheduleDto>>
{
    private readonly IScheduleRepository _repo;

    public GetWeeklyScheduleQueryHandler(IScheduleRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ScheduleDto>> Handle(
        GetWeeklyScheduleQuery request,
        CancellationToken cancellationToken)
    {
        var schedules = await _repo.GetByDateRangeAsync(request.FromDate, request.ToDate);

        return schedules.Select(x => new ScheduleDto(
            x.Id,
            x.EmployeeId,
            x.Employee?.Code ?? "",
            x.Employee?.Name ?? "",
            x.ShiftId,
            x.Shift?.Name ?? "",
            x.Shift?.Position?.Name ?? "",
            x.Shift?.StartTime.ToString() ?? "",
            x.Shift?.EndTime.ToString() ?? "",
            x.WorkDate,
            x.Note
        )).ToList();
    }
}
