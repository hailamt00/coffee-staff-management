namespace CoffeeStaffManagement.Application.Schedules.DTOs;

public record ScheduleRequestDto(
    int RequestId,
    DateOnly WorkDate,
    string ShiftName,
    string PositionName,
    string ShiftStartTime,
    string ShiftEndTime,
    string Status,
    string? Note
);

public record ScheduleDto(
    int Id,
    int EmployeeId,
    string EmployeeCode,
    string EmployeeName,
    int ShiftId,
    string ShiftName,
    string PositionName,
    string ShiftStartTime,
    string ShiftEndTime,
    DateOnly WorkDate,
    string? Note,
    DateTime? CheckIn,
    DateTime? CheckOut
);
