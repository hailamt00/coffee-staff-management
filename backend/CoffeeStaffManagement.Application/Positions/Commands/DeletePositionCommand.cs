using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public record DeletePositionCommand(int Id) : IRequest<Unit>;
