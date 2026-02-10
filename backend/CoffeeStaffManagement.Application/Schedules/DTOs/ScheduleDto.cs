namespace CoffeeStaffManagement.Application.Schedules.DTOs;

public record ScheduleRequestDto(
    int Id,
    DateOnly WorkDate,
    string ShiftName,
    string Status
);

public record ScheduleDto(
    string EmployeeCode,
    string EmployeeName,
    string ShiftName,
    DateOnly WorkDate
);
