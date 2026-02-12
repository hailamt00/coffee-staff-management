using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class CreateEmployeeCommandHandler
    : IRequestHandler<CreateEmployeeCommand, int>
{
    private readonly IEmployeeRepository _repo;
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public CreateEmployeeCommandHandler(
        IEmployeeRepository repo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _repo = repo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<int> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = new Employee
        {
            Name = request.Request.Name,
            Phone = request.Request.Phone,
            Cid = request.Request.Cid,
            Gender = request.Request.Gender,
            ServiceSalary = request.Request.ServiceSalary ?? 0,
            BaristaSalary = request.Request.BaristaSalary ?? 0,
            Dob = request.Request.Dob,
            HireDate = request.Request.HireDate ?? DateOnly.FromDateTime(DateTime.UtcNow)
        };

        await _repo.AddAsync(employee);

        await _logger.LogAsync(
            $"Create Employee: {employee.Name} ({employee.Code}) (ID: {employee.Id}) - user: {_currentUserService.UserId}",
            cancellationToken);

        return employee.Id;
    }
}
