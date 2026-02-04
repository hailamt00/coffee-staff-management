using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public class CheckOutCommandHandler
    : IRequestHandler<CheckOutCommand>
{
    private readonly IAttendanceRepository _repo;

    public CheckOutCommandHandler(IAttendanceRepository repo)
    {
        _repo = repo;
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
            throw new Exception("Attendance not found");

        attendance.CheckOut = TimeOnly.FromDateTime(DateTime.Now);

        await _repo.UpdateAsync(attendance, cancellationToken);
    }
}
