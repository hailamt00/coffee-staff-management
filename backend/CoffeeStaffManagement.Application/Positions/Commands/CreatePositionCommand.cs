using CoffeeStaffManagement.Application.Positions.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public record CreatePositionCommand(SavePositionRequest Request)
    : IRequest<PositionDto>;
