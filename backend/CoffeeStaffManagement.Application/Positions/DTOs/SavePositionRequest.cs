using CoffeeStaffManagement.Application.Shifts.DTOs;

namespace CoffeeStaffManagement.Application.Positions.DTOs;

public record SavePositionRequest(
    string Name,
    List<ShiftInput> Shifts
);