using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class UpdateEmployeeCommandHandler
    : IRequestHandler<UpdateEmployeeCommand, Unit>
{
    private readonly IEmployeeRepository _repo;

    public UpdateEmployeeCommandHandler(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(
        UpdateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Employee not found");

        employee.Name = request.Name;
        employee.Phone = request.Phone;
        employee.Cid = request.Cid;
        employee.Gender = request.Gender;
        employee.SalaryService = request.SalaryService ?? employee.SalaryService;
        employee.SalaryBar = request.SalaryBar ?? employee.SalaryBar;
        employee.Dob = request.Dob;
        employee.HireDate = request.HireDate ?? employee.HireDate;

        await _repo.UpdateAsync(employee);
        return Unit.Value;
    }
}
