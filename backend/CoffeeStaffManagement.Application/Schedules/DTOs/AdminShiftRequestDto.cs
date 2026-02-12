namespace CoffeeStaffManagement.Application.Schedules.DTOs;

public record AdminShiftRequestDto(
    int RequestId,
    string EmployeeCode,
    string EmployeeName,
    string ShiftName,
    DateOnly WorkDate,
    string Status,
    TimeSpan ShiftStartTime,
    TimeSpan ShiftEndTime
);
