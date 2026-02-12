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
            ?? throw new KeyNotFoundException("Employee not found");

        await _repo.DeleteAsync(employee);

        await _logger.LogAsync(
            $"Delete Employee: {employee.Name} ({employee.Code}) (ID: {employee.Id}) - user: {_currentUserService.UserId}",
            cancellationToken);

        return Unit.Value;
    }
}
