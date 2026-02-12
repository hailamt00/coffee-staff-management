namespace CoffeeStaffManagement.Application.Schedules.DTOs;

public record ScheduleRequestDto(
    int Id,
    DateOnly WorkDate,
    string ShiftName,
    string Status
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
    DateOnly WorkDate
);
