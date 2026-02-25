using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class UpdateAttendanceCommandHandler : IRequestHandler<UpdateAttendanceCommand>
{
    private readonly IAttendanceRepository _attendanceRepo;

    public UpdateAttendanceCommandHandler(IAttendanceRepository attendanceRepo)
    {
        _attendanceRepo = attendanceRepo;
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
            if (totalHours < 0) throw new ArgumentException("CheckOut must be after CheckIn");
        }

        attendance.CheckIn = request.CheckIn;
        attendance.CheckOut = request.CheckOut;
        attendance.TotalHours = totalHours;
        attendance.Note = string.IsNullOrWhiteSpace(request.Note) ? "Admin Edited" : request.Note;

        await _attendanceRepo.UpdateAsync(attendance, cancellationToken);
    }
}
