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

        // Prevent deleting your own account
        if (_currentUserService.UserId.HasValue && _currentUserService.UserId.Value == request.Id)
        {
            throw new InvalidOperationException("Không thể xóa tài khoản đang đăng nhập");
        }

        try
        {
            await _repo.DeleteAsync(employee);
        }
        catch (Exception ex) when (
            ex.InnerException?.Message?.Contains("foreign key") == true ||
            ex.InnerException?.Message?.Contains("violates") == true ||
            ex.InnerException?.Message?.Contains("REFERENCE") == true ||
            ex.InnerException?.Message?.Contains("constraint") == true)
        {
            throw new InvalidOperationException(
                $"Không thể xóa nhân viên '{employee.Name}' vì còn dữ liệu liên quan (lịch làm, chấm công, bảng lương...). Hãy xóa các dữ liệu liên quan trước.");
        }

        await _logger.LogAsync(
            $"Delete Employee: {employee.Name} ({employee.Code}) (ID: {employee.Id}) - user: {_currentUserService.UserId}",
            cancellationToken);

        return Unit.Value;
    }
}

