using CoffeeStaffManagement.Application.Positions.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Queries;

public record GetPositionsQuery : IRequest<List<PositionDto>>;
