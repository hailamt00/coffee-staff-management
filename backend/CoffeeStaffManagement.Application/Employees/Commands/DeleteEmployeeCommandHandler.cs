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
    private readonly IActivityLogger _logger;
    private readonly ICurrentUserService _currentUserService;

    public DeleteEmployeeCommandHandler(
        IEmployeeRepository repo,
        IActivityLogger logger,
        ICurrentUserService currentUserService)
    {
        _repo = repo;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(
        DeleteEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = await _repo.GetByIdAsync(request.Id)
            ?? throw new Exception("Employee not found");

        await _repo.DeleteAsync(employee);

        await _logger.LogAsync(
            _currentUserService.UserId,
            "Delete",
            "Employee",
            employee.Id,
            $"Deleted employee {employee.Name} ({employee.Code})",
            cancellationToken);

        return Unit.Value;
    }
}
