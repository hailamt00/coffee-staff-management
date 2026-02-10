using PayrollEntity = CoffeeStaffManagement.Domain.Entities.Payroll;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPayrollRepository
{
    Task<PayrollEntity?> GetAsync(
        int employeeId,
        int month,
        int year,
        CancellationToken ct);

    Task<PayrollEntity?> GetByIdAsync(
        int payrollId,
        CancellationToken ct);

    Task AddAsync(
        PayrollEntity payroll,
        CancellationToken ct);

    Task UpdateAsync(
        PayrollEntity payroll,
        CancellationToken ct);
}


