using MediatR;

namespace CoffeeStaffManagement.Application.Positions.Commands;

public record UpdatePositionCommand(
    int Id,
    string Name
) : IRequest<Unit>;
