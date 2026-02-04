using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class DeleteEmployeeCommandHandler
    : IRequestHandler<DeleteEmployeeCommand, Unit>
{
    private readonly IEmployeeRepository _repo;

    public DeleteEmployeeCommandHandler(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<Unit> Handle(
        DeleteEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Employee not found");

        await _repo.DeleteAsync(employee);
        return Unit.Value;
    }
}
