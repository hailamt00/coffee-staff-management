using MediatR;

public record CreateShiftRequestCommand(
    int EmployeeId,
    int ShiftId,
    DateOnly WorkDate,
    string? Note = null
) : IRequest;
