using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class DeleteAttendanceCommandHandler : IRequestHandler<DeleteAttendanceCommand>
{
    private readonly IAttendanceRepository _attendanceRepo;

    public DeleteAttendanceCommandHandler(IAttendanceRepository attendanceRepo)
    {
        _attendanceRepo = attendanceRepo;
    }

    public async Task Handle(DeleteAttendanceCommand request, CancellationToken cancellationToken)
    {
        var attendance = await _attendanceRepo.GetByIdAsync(request.AttendanceId);
        if (attendance == null) throw new KeyNotFoundException("Attendance record not found");

        await _attendanceRepo.DeleteAsync(attendance, cancellationToken);
    }
}
