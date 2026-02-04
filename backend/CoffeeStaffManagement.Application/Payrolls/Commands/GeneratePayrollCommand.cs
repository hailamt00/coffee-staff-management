using MediatR;

namespace CoffeeStaffManagement.Application.Payroll.Commands;

public record GeneratePayrollCommand(
    int EmployeeId,
    string Month // yyyy-MM
) : IRequest;
