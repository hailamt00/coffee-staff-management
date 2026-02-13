using MediatR;

public record UpdateShiftRequestCommand(
    int Id,
    int ShiftId,
    DateOnly WorkDate,
    string? Note = null
) : IRequest;
