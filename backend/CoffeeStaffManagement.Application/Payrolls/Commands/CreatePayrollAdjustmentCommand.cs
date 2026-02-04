using MediatR;

namespace CoffeeStaffManagement.Application.Payrolls.Commands;

public record CreatePayrollAdjustmentCommand(
    int PayrollId,
    decimal Amount,
    string? Reason
) : IRequest;
