using CoffeeStaffManagement.Application.Common.Interfaces;
using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;
using MediatR;

namespace CoffeeStaffManagement.Application.LeaveRequests.Commands;

public class ApproveLeaveRequestCommandHandler
    : IRequestHandler<ApproveLeaveRequestCommand>
{
    private readonly ILeaveRequestRepository _leaveRepo;
    private readonly IAttendanceRepository _attendanceRepo;

    public ApproveLeaveRequestCommandHandler(
        ILeaveRequestRepository leaveRepo,
        IAttendanceRepository attendanceRepo)
    {
        _leaveRepo = leaveRepo;
        _attendanceRepo = attendanceRepo;
    }

    public async Task Handle(
        ApproveLeaveRequestCommand request,
        CancellationToken ct)
    {
        var leave = await _leaveRepo.GetByIdAsync(request.LeaveRequestId);
        if (leave is null)
            throw new Exception("Leave request not found");

        leave.Status = request.Approved
            ? "approved"
            : "rejected";

        await _leaveRepo.UpdateAsync(leave, ct);

        if (!request.Approved)
            return;

        // 👉 Create ABSENT attendance
        for (var date = leave.FromDate;
             date <= leave.ToDate;
             date = date.AddDays(1))
        {
            var attendance = new AttendanceEntity
            {
                EmployeeId = leave.EmployeeId,
                WorkDate = date,
                Status = "absent"
            };

            await _attendanceRepo.AddAsync(attendance, ct);
        }
    }
}
