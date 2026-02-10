using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public record CreateEmployeeCommand(CreateEmployeeDto Request) : IRequest<int>;
