using PayrollEntity = CoffeeStaffManagement.Domain.Entities.Payroll;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPayrollRepository : IGenericRepository<PayrollEntity>
{
    Task<PayrollEntity?> GetAsync(
        int employeeId,
        int month,
        int year,
        CancellationToken ct);

    Task<List<PayrollEntity>> GetByMonthAsync(
        int month,
        int year,
        CancellationToken ct);

    new Task<PayrollEntity?> GetByIdAsync(
        int payrollId,
        CancellationToken ct);

    Task UpdateAsync(
        PayrollEntity payroll,
        CancellationToken ct);
}


