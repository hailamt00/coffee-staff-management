using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;
using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class CheckOutCommandHandler
    : IRequestHandler<CheckOutCommand>
{
    private readonly IAttendanceRepository _repo;
    private readonly IScheduleRepository _scheduleRepo;

    public CheckOutCommandHandler(IAttendanceRepository repo, IScheduleRepository scheduleRepo)
    {
        _repo = repo;
        _scheduleRepo = scheduleRepo;
    }

    public async Task Handle(
        CheckOutCommand request,
        CancellationToken cancellationToken)
    {
        var attendance = await _repo.GetAsync(
            request.Request.EmployeeId,
            request.Request.ShiftId,
            request.Request.WorkDate);

        if (attendance == null)
            throw new KeyNotFoundException("Attendance not found");

        if (attendance.CheckOut != null)
            throw new ArgumentException("Already checked out");

        var now = DateTime.Now;
        var actualCheckOutDateTime = now;
        var checkOutTime = now.TimeOfDay;
        var shiftEndTime = attendance.Schedule?.Shift?.EndTime;

        var date = request.Request.WorkDate.ToDateTime(TimeOnly.MinValue);

        List<Domain.Entities.Schedule> subsequentSchedules = new();
        if (shiftEndTime.HasValue)
        {
            var todaySchedules = await _scheduleRepo.GetByEmployeeAndDateAsync(request.Request.EmployeeId, request.Request.WorkDate);
            subsequentSchedules = todaySchedules
                .Where(s => s.Shift != null && s.Shift.StartTime >= shiftEndTime.Value && s.Id != attendance.ScheduleId)
                .OrderBy(s => s.Shift!.StartTime)
                .ToList();
        }

        bool hasSubsequentShift = subsequentSchedules.Any();
        bool shouldSplit = hasSubsequentShift && shiftEndTime.HasValue && actualCheckOutDateTime > date.Add(shiftEndTime.Value);

        if (shouldSplit && shiftEndTime.HasValue)
        {
            attendance.CheckOut = date.Add(shiftEndTime.Value);
        }
        else
        {
            attendance.CheckOut = actualCheckOutDateTime;
            if (shiftEndTime.HasValue && checkOutTime < shiftEndTime.Value.Subtract(TimeSpan.FromMinutes(15))) // 15 mins grace period
            {
                var earlyNote = $"Early checkout: {checkOutTime:hh\\:mm} (Shift ends: {shiftEndTime.Value:hh\\:mm})";
                attendance.Note = string.IsNullOrEmpty(attendance.Note)
                    ? earlyNote
                    : $"{attendance.Note}; {earlyNote}";
            }
        }

        if (attendance.CheckIn.HasValue)
        {
            var duration = attendance.CheckOut.Value - attendance.CheckIn.Value;
            attendance.TotalHours = Math.Round((decimal)duration.TotalHours, 2);
        }

        await _repo.UpdateAsync(attendance, cancellationToken);

        if (shouldSplit && shiftEndTime.HasValue)
        {
            DateTime remainingCheckIn = date.Add(shiftEndTime.Value);
            for (int i = 0; i < subsequentSchedules.Count; i++)
            {
                var nextSchedule = subsequentSchedules[i];
                if (actualCheckOutDateTime <= remainingCheckIn)
                    break;

                var nextStartDateTime = date.Add(nextSchedule.Shift!.StartTime!.Value);
                var nextEndDateTime = date.Add(nextSchedule.Shift.EndTime!.Value);

                DateTime s2CheckIn = remainingCheckIn > nextStartDateTime ? remainingCheckIn : nextStartDateTime;

                // If this is the last subsequent schedule, let it take all remaining time (overtime)
                bool isLast = (i == subsequentSchedules.Count - 1);
                DateTime s2CheckOut = (isLast || actualCheckOutDateTime <= nextEndDateTime)
                    ? actualCheckOutDateTime
                    : nextEndDateTime;

                if (s2CheckOut > s2CheckIn)
                {
                    var nextAttendance = await _repo.GetAsync(request.Request.EmployeeId, nextSchedule.ShiftId, request.Request.WorkDate);

                    if (nextAttendance == null)
                    {
                        nextAttendance = new AttendanceEntity
                        {
                            EmployeeId = request.Request.EmployeeId,
                            ScheduleId = nextSchedule.Id,
                            CheckIn = s2CheckIn,
                            CheckOut = s2CheckOut,
                            TotalHours = Math.Round((decimal)(s2CheckOut - s2CheckIn).TotalHours, 2),
                            Note = "Auto-Split from previous shift"
                        };
                        await _repo.AddAsync(nextAttendance, cancellationToken);
                    }
                    else if (nextAttendance.CheckOut == null)
                    {
                        nextAttendance.CheckOut = s2CheckOut;
                        if (nextAttendance.CheckIn.HasValue)
                        {
                            nextAttendance.TotalHours = Math.Round((decimal)(s2CheckOut - nextAttendance.CheckIn.Value).TotalHours, 2);
                        }
                        string splitNote = "Auto-Split checkout";
                        nextAttendance.Note = string.IsNullOrEmpty(nextAttendance.Note) ? splitNote : nextAttendance.Note + "; " + splitNote;
                        await _repo.UpdateAsync(nextAttendance, cancellationToken);
                    }

                    remainingCheckIn = s2CheckOut;
                }
            }
        }
    }
}
