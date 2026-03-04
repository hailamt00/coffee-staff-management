using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class UpdateAttendanceCommandHandler : IRequestHandler<UpdateAttendanceCommand>
{
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IScheduleRepository _scheduleRepo;

    public UpdateAttendanceCommandHandler(IAttendanceRepository attendanceRepo, IScheduleRepository scheduleRepo)
    {
        _attendanceRepo = attendanceRepo;
        _scheduleRepo = scheduleRepo;
    }

    public async Task Handle(UpdateAttendanceCommand request, CancellationToken cancellationToken)
    {
        var attendance = await _attendanceRepo.GetByIdAsync(request.AttendanceId);
        if (attendance == null) throw new KeyNotFoundException("Attendance record not found");

        decimal? totalHours = null;
        if (request.CheckIn.HasValue && request.CheckOut.HasValue)
        {
            var diff = request.CheckOut.Value - request.CheckIn.Value;
            totalHours = (decimal)diff.TotalHours;
            // Removed strict validation to allow overnight shifts or manual overrides, but kept positive check
            if (totalHours < 0) totalHours = 0;
        }

        if (request.EmployeeId.HasValue && request.ShiftId.HasValue && request.WorkDate.HasValue)
        {
            var schedule = await _scheduleRepo.GetAsync(request.EmployeeId.Value, request.ShiftId.Value, request.WorkDate.Value);

            if (schedule == null)
            {
                // Auto-create Substitute Schedule if moving to a new slot
                schedule = new Domain.Entities.Schedule
                {
                    EmployeeId = request.EmployeeId.Value,
                    ShiftId = request.ShiftId.Value,
                    WorkDate = request.WorkDate.Value,
                    ApprovedAt = DateTime.Now,
                    Note = "System Auto-Created: Manual Attendance Reassignment"
                };
                await _scheduleRepo.AddAsync(schedule);
            }

            attendance.ScheduleId = schedule.Id;
            attendance.EmployeeId = request.EmployeeId.Value;
        }

        attendance.CheckIn = request.CheckIn;
        attendance.CheckOut = request.CheckOut;
        attendance.TotalHours = totalHours;
        attendance.Note = string.IsNullOrWhiteSpace(request.Note) ? "Admin Edited" : request.Note;

        await _attendanceRepo.UpdateAsync(attendance, cancellationToken);
    }
}
