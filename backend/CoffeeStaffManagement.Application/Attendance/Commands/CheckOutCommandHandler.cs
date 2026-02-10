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

        if (attendance.CheckOut != null)
            throw new Exception("Already checked out");

        var now = DateTime.Now;
        var checkOutTime = now.TimeOfDay;
        var shiftEndTime = attendance.Schedule?.Shift?.EndTime;

        attendance.CheckOut = now;

        if (shiftEndTime.HasValue && checkOutTime < shiftEndTime.Value.Subtract(TimeSpan.FromMinutes(15))) // 15 mins grace period
        {
            var earlyNote = $"Early checkout: {checkOutTime:hh\\:mm} (Shift ends: {shiftEndTime.Value:hh\\:mm})";
            attendance.Note = string.IsNullOrEmpty(attendance.Note)
                ? earlyNote
                : $"{attendance.Note}; {earlyNote}";
        }

        if (attendance.CheckIn.HasValue)
        {
            var duration = attendance.CheckOut.Value - attendance.CheckIn.Value;
            attendance.TotalHours = Math.Round((decimal)duration.TotalHours, 2);
        }

        await _repo.UpdateAsync(attendance, cancellationToken);
    }
}
