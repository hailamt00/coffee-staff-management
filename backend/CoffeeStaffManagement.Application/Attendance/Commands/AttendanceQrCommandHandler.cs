// using CoffeeStaffManagement.Application.Common.Interfaces;
// using CoffeeStaffManagement.Domain.Entities;
// using CoffeeStaffManagement.Domain.Enums;
// using MediatR;

// namespace CoffeeStaffManagement.Application.Attendance.Commands;

// public class AttendanceQrCommandHandler
//     : IRequestHandler<AttendanceQrCommand, Unit>
// {
//     private readonly IEmployeeRepository _employeeRepo;
//     private readonly IAttendanceQrRepository _qrRepo;

//     public AttendanceQrCommandHandler(
//         IEmployeeRepository employeeRepo,
//         IAttendanceQrRepository qrRepo)
//     {
//         _employeeRepo = employeeRepo;
//         _qrRepo = qrRepo;
//     }

//     public async Task<Unit> Handle(
//         AttendanceQrCommand request,
//         CancellationToken ct)
//     {
//         var today = DateOnly.FromDateTime(DateTime.UtcNow);

//         // // var employee = await _employeeRepo
//         //     // .GetByPhoneAsync(request.Phone, ct)
//         //     ?? throw new Exception("EMPLOYEE_NOT_FOUND");

//         // // var todayLogs = await _qrRepo.GetTodayLogsAsync(
//         //     // employee.Id,
//         //     request.Role,
//         //     today,
//         //     ct);

//         // var checkInCount = todayLogs
//         //     .Count(x => x.ActionType == AttendanceQrAction.CheckIn.ToString());

//         // var checkOutCount = todayLogs
//         //     .Count(x => x.ActionType == AttendanceQrAction.CheckOut.ToString());

//         // if (request.Action == AttendanceQrAction.CheckIn && checkInCount >= 3)
//         //     throw new Exception("CHECK_IN_LIMIT_REACHED");

//         // if (request.Action == AttendanceQrAction.CheckOut && checkOutCount >= 3)
//         //     throw new Exception("CHECK_OUT_LIMIT_REACHED");

//         // var lastAction = todayLogs
//         //     .OrderByDescending(x => x.ActionTime)
//         //     .FirstOrDefault()?.ActionType;

//         if (lastAction == request.Action.ToString())
//             throw new Exception("INVALID_ATTENDANCE_SEQUENCE");

//         if (request.Action == AttendanceQrAction.CheckOut && checkInCount == 0)
//             throw new Exception("CHECK_OUT_BEFORE_CHECK_IN");

//         var log = new AttendanceQrLog
//         {
            
//             Phone = request.Phone,
//             Role = request.Role,
//             WorkDate = today,
//             ActionType = request.Action.ToString(),
//             ActionTime = DateTime.UtcNow
//         };

//         await _qrRepo.AddAsync(log, ct);

//         return Unit.Value;
//     }
// }
