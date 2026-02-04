using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Queries;

public record GetEmployeeByIdQuery(int Id) : IRequest<EmployeeDto?>;
