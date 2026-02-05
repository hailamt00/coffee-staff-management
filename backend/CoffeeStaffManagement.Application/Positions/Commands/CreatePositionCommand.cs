using MediatR;

public record CreatePositionCommand(SavePositionRequest Request)
    : IRequest<PositionDto>;
