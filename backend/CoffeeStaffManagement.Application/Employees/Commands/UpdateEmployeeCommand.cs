using MediatR;
using System;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public record UpdateEmployeeCommand(
    int Id,
    string Name,
    string Phone,
    string? Cid,
    string? Gender,
    decimal? SalaryService,
    decimal? SalaryBar,
    DateOnly? Dob,
    DateTime? HireDate
) : IRequest<Unit>;
