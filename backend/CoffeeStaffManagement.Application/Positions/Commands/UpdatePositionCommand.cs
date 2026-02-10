using CoffeeStaffManagement.Application.Positions.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public record UpdatePositionCommand(
    int Id,
    SavePositionRequest Request
) : IRequest<PositionDto>;
