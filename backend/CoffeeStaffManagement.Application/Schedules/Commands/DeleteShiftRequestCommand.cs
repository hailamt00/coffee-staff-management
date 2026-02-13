using MediatR;

public record DeleteShiftRequestCommand(int Id) : IRequest;
