using PayrollAdjustmentEntity = CoffeeStaffManagement.Domain.Entities.PayrollAdjustment;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPayrollAdjustmentRepository
{
    Task AddAsync(PayrollAdjustmentEntity adjustment, CancellationToken ct);
}
