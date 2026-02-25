using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Schedules.Queries;

public class GetScheduleByDateQueryHandler
    : IRequestHandler<GetScheduleByDateQuery, List<ScheduleDto>>
{
    private readonly IScheduleRepository _repo;

    public GetScheduleByDateQueryHandler(IScheduleRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ScheduleDto>> Handle(
        GetScheduleByDateQuery request,
        CancellationToken cancellationToken)
    {
        var schedules = await _repo.GetByDateAsync(request.Date);

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
            x.Note,
            x.Attendance?.CheckIn,
            x.Attendance?.CheckOut
        )).ToList();
    }
}
