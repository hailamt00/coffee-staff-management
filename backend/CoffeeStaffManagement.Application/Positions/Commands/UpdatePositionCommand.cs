using MediatR;

public record UpdatePositionCommand(
    int Id,
    SavePositionRequest Request
) : IRequest<PositionDto>;
