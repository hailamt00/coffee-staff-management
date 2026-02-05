using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public record GetPositionByIdQuery(int Id) 
    : IRequest<PositionDto?>;
