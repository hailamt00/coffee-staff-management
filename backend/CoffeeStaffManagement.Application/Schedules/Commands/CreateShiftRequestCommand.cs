using MediatR;

public record CreateShiftRequestCommand(
    int EmployeeId,
    int ShiftId,
    DateOnly WorkDate
) : IRequest;
