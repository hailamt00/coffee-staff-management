using System.Collections.Generic;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Queries
{
    public record GetEmployeesQuery(string? Search)
        : IRequest<List<EmployeeDto>>;
}
