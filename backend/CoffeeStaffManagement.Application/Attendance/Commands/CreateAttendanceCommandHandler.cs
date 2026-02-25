using CoffeeStaffManagement.Application.Common.Interfaces;
using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class CreateAttendanceCommandHandler : IRequestHandler<CreateAttendanceCommand>
{
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IScheduleRepository _scheduleRepo;

    public CreateAttendanceCommandHandler(
        IAttendanceRepository attendanceRepo,
        IScheduleRepository scheduleRepo)
    {
        _attendanceRepo = attendanceRepo;
        _scheduleRepo = scheduleRepo;
    }

    public async Task Handle(CreateAttendanceCommand request, CancellationToken cancellationToken)
    {
        // 1. Find Schedule
        var schedule = await _scheduleRepo.GetAsync(request.EmployeeId, request.ShiftId, request.WorkDate);

        if (schedule == null)
        {
            // Auto-create Substitute Schedule
            schedule = new Domain.Entities.Schedule
            {
                EmployeeId = request.EmployeeId,
                ShiftId = request.ShiftId,
                WorkDate = request.WorkDate,
                ApprovedAt = DateTime.Now,
                Note = "System Auto-Created: Manual Attendance Input"
            };
            await _scheduleRepo.AddAsync(schedule);
        }

        // 2. Check if Attendance already exists
        var existing = await _attendanceRepo.GetAsync(request.EmployeeId, request.ShiftId, request.WorkDate);
        if (existing != null)
            throw new ArgumentException("Attendance record already exists for this shift.");

        // 3. Time Diff calc
        decimal? totalHours = null;
        if (request.CheckIn.HasValue && request.CheckOut.HasValue)
        {
            var diff = request.CheckOut.Value - request.CheckIn.Value;
            totalHours = (decimal)diff.TotalHours;
            if (totalHours < 0) throw new ArgumentException("CheckOut must be after CheckIn");
        }

        // 4. Create Attendance
        var attendance = new AttendanceEntity
        {
            EmployeeId = request.EmployeeId,
            ScheduleId = schedule.Id,
            CheckIn = request.CheckIn,
            CheckOut = request.CheckOut,
            TotalHours = totalHours,
            Note = string.IsNullOrWhiteSpace(request.Note) ? "Admin Added" : request.Note
        };

        await _attendanceRepo.AddAsync(attendance, cancellationToken);
    }
}
