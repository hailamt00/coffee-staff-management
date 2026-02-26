using CoffeeStaffManagement.Application.Attendance.DTOs;
using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Queries;

public class GetAttendanceByDateRangeQueryHandler
    : IRequestHandler<GetAttendanceByDateRangeQuery, List<AttendanceDto>>
{
    private readonly IScheduleRepository _scheduleRepository;
    private readonly IAttendanceRepository _attendanceRepository;

    public GetAttendanceByDateRangeQueryHandler(
        IScheduleRepository scheduleRepository,
        IAttendanceRepository attendanceRepository)
    {
        _scheduleRepository = scheduleRepository;
        _attendanceRepository = attendanceRepository;
    }

    public async Task<List<AttendanceDto>> Handle(
        GetAttendanceByDateRangeQuery request,
        CancellationToken cancellationToken)
    {
        // For Attendance View: ONLY return items that have actual attendance records
        // Do NOT loop through schedules and append "missing" ones.
        var attendances = await _attendanceRepository.GetByDateRangeAsync(request.StartDate, request.EndDate);

        var result = new List<AttendanceDto>();

        foreach (var att in attendances)
        {
            var schedule = att.Schedule;
            var status = "present";

            if (att.CheckIn.HasValue && schedule?.Shift?.StartTime != null)
            {
                var shiftStartTime = schedule.Shift.StartTime.Value;
                var checkInTime = att.CheckIn.Value.TimeOfDay;
                if (checkInTime > shiftStartTime.Add(TimeSpan.FromMinutes(15))) // 15 mins grace period
                {
                    status = "late";
                }
            }

            result.Add(new AttendanceDto
            {
                Id = att.Id,
                EmployeeId = att.EmployeeId,
                EmployeeName = att.Employee?.Name ?? schedule?.Employee?.Name ?? "Unknown",
                EmployeePhone = att.Employee?.Phone ?? schedule?.Employee?.Phone ?? "—",
                ShiftId = schedule?.ShiftId,
                ShiftName = schedule?.Shift?.Name ?? "—",
                PositionName = schedule?.Shift?.Position?.Name ?? "—",
                WorkDate = schedule?.WorkDate ?? (att.CheckIn.HasValue ? DateOnly.FromDateTime(att.CheckIn.Value) : DateOnly.MinValue),
                CheckIn = att.CheckIn,
                CheckOut = att.CheckOut,
                TotalHours = (double?)att.TotalHours,
                Note = att.Note,
                Status = status
            });
        }

        return result.OrderByDescending(r => r.WorkDate).ToList();
    }
}
