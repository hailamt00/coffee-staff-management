using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Enums;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class UpdateEmployeeCommandHandler
    : IRequestHandler<UpdateEmployeeCommand, Unit>
{
    private readonly IEmployeeRepository _repo;
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public UpdateEmployeeCommandHandler(
        IEmployeeRepository repo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _repo = repo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(
        UpdateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Employee not found");

        employee.Name = request.Request.Name;
        employee.Phone = request.Request.Phone;
        employee.Cid = request.Request.Cid;
        employee.Gender = request.Request.Gender;
        employee.ServiceSalary = request.Request.ServiceSalary ?? employee.ServiceSalary;
        employee.BaristaSalary = request.Request.BaristaSalary ?? employee.BaristaSalary;
        employee.Dob = request.Request.Dob;
        employee.HireDate = request.Request.HireDate ?? employee.HireDate;

        await _repo.UpdateAsync(employee);

        await _logger.LogAsync(
            _currentUserService.UserId,
            "Update",
            "Employee",
            employee.Id,
            $"Updated employee {employee.Name} ({employee.Code})",
            cancellationToken);

        return Unit.Value;
    }
}
