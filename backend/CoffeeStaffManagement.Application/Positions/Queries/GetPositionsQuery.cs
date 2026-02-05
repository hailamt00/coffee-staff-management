using MediatR;

public record GetPositionsQuery : IRequest<List<PositionDto>>;
