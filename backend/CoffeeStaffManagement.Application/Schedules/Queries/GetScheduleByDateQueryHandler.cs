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
            x.Employee.Code,
            x.Employee.Name,
            x.Shift.Name,
            x.WorkDate
        )).ToList();
    }
}
