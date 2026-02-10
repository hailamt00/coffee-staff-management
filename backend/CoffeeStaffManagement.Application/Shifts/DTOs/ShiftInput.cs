namespace CoffeeStaffManagement.Application.Shifts.DTOs;

public record ShiftInput(
    string Name,
    string StartTime,
    string EndTime,
    bool Status
);
