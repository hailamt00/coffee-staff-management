namespace CoffeeStaffManagement.Application.Schedules.DTOs;

public record AdminShiftRequestDto(
    int RequestId,
    string EmployeeCode,
    string EmployeeName,
    string EmployeePhone,
    string ShiftName,
    string PositionName,
    DateOnly WorkDate,
    string Status,
    TimeSpan ShiftStartTime,
    TimeSpan ShiftEndTime,
    string? Note
);
