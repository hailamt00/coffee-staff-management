using MediatR;

namespace CoffeeStaffManagement.Application.Payroll.Commands;

public record GeneratePayrollCommand(
    int EmployeeId,
    int Month,
    int Year
) : IRequest;
