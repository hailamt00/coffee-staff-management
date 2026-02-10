using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public record UpdateEmployeeCommand(int Id, UpdateEmployeeDto Request) : IRequest<Unit>;
