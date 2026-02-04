using CoffeeStaffManagement.Application.Attendance.DTOs;
using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Queries;

public class GetAttendanceByDateQueryHandler
    : IRequestHandler<GetAttendanceByDateQuery, List<AttendanceDto>>
{
    private readonly IAttendanceRepository _repo;

    public GetAttendanceByDateQueryHandler(IAttendanceRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<AttendanceDto>> Handle(
        GetAttendanceByDateQuery request,
        CancellationToken cancellationToken)
    {
        var list = await _repo.GetByDateAsync(request.Date);

        return list.Select(a => new AttendanceDto
        {
            Id = a.Id,
            EmployeeId = a.EmployeeId,
            EmployeeName = a.Employee.Name,
            ShiftId = a.ShiftId,
            ShiftName = a.Shift.Name,
            WorkDate = a.WorkDate,
            CheckIn = a.CheckIn,
            CheckOut = a.CheckOut,
            Status = a.Status
        }).ToList();
    }
}
