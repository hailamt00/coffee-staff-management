using CoffeeStaffManagement.Application.Common.Interfaces;
using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class CheckInCommandHandler
    : IRequestHandler<CheckInCommand>
{
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IScheduleRepository _scheduleRepo;
    private readonly IShiftRepository _shiftRepo;

    public CheckInCommandHandler(
        IAttendanceRepository attendanceRepo,
        IScheduleRepository scheduleRepo,
        IShiftRepository shiftRepo)
    {
        _attendanceRepo = attendanceRepo;
        _scheduleRepo = scheduleRepo;
        _shiftRepo = shiftRepo;
    }

    public async Task Handle(
        CheckInCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Find Schedule
        var schedule = await _scheduleRepo.GetAsync(
            request.Request.EmployeeId,
            request.Request.ShiftId,
            request.Request.WorkDate);

        if (schedule == null)
        {
            // Auto-create Substitute Schedule
            schedule = new Domain.Entities.Schedule
            {
                EmployeeId = request.Request.EmployeeId,
                ShiftId = request.Request.ShiftId,
                WorkDate = request.Request.WorkDate,
                ApprovedAt = DateTime.Now,
                Note = "System Auto-Created: Substitute Check-In"
            };
            await _scheduleRepo.AddAsync(schedule);
        }

        // 2. Check if already checked in
        var existing = await _attendanceRepo.GetAsync(
            request.Request.EmployeeId,
            request.Request.ShiftId,
            request.Request.WorkDate); // Note: Repo might need update to search by ScheduleId, but sticking to existing params for now if unique enough

        if (existing != null)
            throw new ArgumentException("Already checked in");

        // 3. Create Attendance
        var now = DateTime.Now;
        var checkInTime = now.TimeOfDay;
        var shift = schedule.Shift ?? await _shiftRepo.GetByIdAsync(schedule.ShiftId);
        var shiftStartTime = shift?.StartTime;

        string? note = null;
        if (shiftStartTime.HasValue && checkInTime > shiftStartTime.Value.Add(TimeSpan.FromMinutes(15))) // 15 mins grace period
        {
            note = $"Late: {checkInTime:hh\\:mm} (Shift starts: {shiftStartTime.Value:hh\\:mm})";
        }

        var attendance = new AttendanceEntity
        {
            EmployeeId = request.Request.EmployeeId,
            ScheduleId = schedule.Id,
            CheckIn = now,
            Note = note
        };

        await _attendanceRepo.AddAsync(attendance, cancellationToken);
    }
}
