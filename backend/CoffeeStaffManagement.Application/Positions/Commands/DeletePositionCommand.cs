using MediatR;

public record DeletePositionCommand(int Id) : IRequest;
