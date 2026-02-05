public record SavePositionRequest(
    string Name,
    List<ShiftInput> Shifts
);