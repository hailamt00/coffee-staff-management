using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class CreateEmployeeCommandHandler
    : IRequestHandler<CreateEmployeeCommand, int>
{
    private readonly IEmployeeRepository _repo;

    public CreateEmployeeCommandHandler(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = new Employee
        {
            Name = request.Name,
            Phone = request.Phone,
            Cid = request.Cid,
            Gender = request.Gender,
            SalaryService = request.SalaryService ?? 0,
            SalaryBar = request.SalaryBar ?? 0,
            Dob = request.Dob,
            HireDate = request.HireDate ?? DateTime.UtcNow
        };

        await _repo.AddAsync(employee);
        return employee.Id;
    }
}
