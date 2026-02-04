using CoffeeStaffManagement.Application.Common.Interfaces;
using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class CheckInCommandHandler
    : IRequestHandler<CheckInCommand>
{
    private readonly IAttendanceRepository _repo;

    public CheckInCommandHandler(IAttendanceRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        CheckInCommand request,
        CancellationToken cancellationToken)
    {
        var existing = await _repo.GetAsync(
            request.Request.EmployeeId,
            request.Request.ShiftId,
            request.Request.WorkDate);

        if (existing != null)
            throw new Exception("Already checked in");

        var attendance = new AttendanceEntity
        {
            EmployeeId = request.Request.EmployeeId,
            ShiftId = request.Request.ShiftId,
            WorkDate = request.Request.WorkDate,
            CheckIn = TimeOnly.FromDateTime(DateTime.Now),
            Status = "present"
        };

        await _repo.AddAsync(attendance, cancellationToken);
    }
}
