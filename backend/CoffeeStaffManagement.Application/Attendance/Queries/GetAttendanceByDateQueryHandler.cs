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
            EmployeeName = a.Employee?.Name ?? "Unknown",
            EmployeePhone = a.Employee?.Phone ?? "Unknown",
            ShiftId = a.Schedule?.ShiftId ?? 0,
            ShiftName = a.Schedule?.Shift?.Name ?? "Unknown",
            PositionName = a.Schedule?.Shift?.Position?.Name ?? "Unknown",
            WorkDate = a.Schedule?.WorkDate ?? default,
            CheckIn = a.CheckIn,
            CheckOut = a.CheckOut,
            TotalHours = (double?)a.TotalHours,
            Note = a.Note ?? a.Schedule?.Note,
            Status = a.CheckIn != null ? "present" : "absent" // or derived logic
        }).ToList();
    }
}
