using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using MediatR;

public class GetMyShiftRequestsQueryHandler
    : IRequestHandler<GetMyShiftRequestsQuery, List<EmployeeShiftRequestDto>>
{
    private readonly IEmployeeShiftRequestRepository _repo;

    public GetMyShiftRequestsQueryHandler(IEmployeeShiftRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<EmployeeShiftRequestDto>> Handle(
        GetMyShiftRequestsQuery request,
        CancellationToken cancellationToken)
    {
        var data = await _repo.GetByEmployeeAsync(request.EmployeeId);

        return data.Select(x => new EmployeeShiftRequestDto(
            x.Id,
            x.WorkDate,
            x.Shift.Name,
            x.Status
        )).ToList();
    }
}
