using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Payrolls.Commands;

public class CreatePayrollAdjustmentCommandHandler
    : IRequestHandler<CreatePayrollAdjustmentCommand>
{
    private readonly IPayrollRepository _payrollRepo;
    private readonly IPayrollAdjustmentRepository _adjustmentRepo;

    public CreatePayrollAdjustmentCommandHandler(
        IPayrollRepository payrollRepo,
        IPayrollAdjustmentRepository adjustmentRepo)
    {
        _payrollRepo = payrollRepo;
        _adjustmentRepo = adjustmentRepo;
    }

    public async Task Handle(
        CreatePayrollAdjustmentCommand request,
        CancellationToken ct)
    {
        var payroll = await _payrollRepo
            .GetByIdAsync(request.PayrollId, ct);

        if (payroll is null)
            throw new Exception("Payroll not found");

        var adjustment = new Domain.Entities.PayrollAdjustment
        {
            PayrollId = request.PayrollId,
            Amount = request.Amount,
            Reason = request.Reason
        };

        await _adjustmentRepo.AddAsync(adjustment, ct);

        // 🔥 Recalculate total salary
        payroll.TotalSalary += request.Amount;

        await _payrollRepo.UpdateAsync(payroll, ct);
    }
}
