using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public record DeleteEmployeeCommand(int Id) : IRequest<Unit>;
