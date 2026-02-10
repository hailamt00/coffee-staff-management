using CoffeeStaffManagement.Application.Common.Interfaces;
using PayrollEntity = CoffeeStaffManagement.Domain.Entities.Payroll;
using MediatR;

namespace CoffeeStaffManagement.Application.Payroll.Commands;

public class GeneratePayrollCommandHandler
    : IRequestHandler<GeneratePayrollCommand>
{
    private readonly IPayrollRepository _payrollRepo;
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IEmployeeRepository _employeeRepo;

    public GeneratePayrollCommandHandler(
        IPayrollRepository payrollRepo,
        IAttendanceRepository attendanceRepo,
        IEmployeeRepository employeeRepo)
    {
        _payrollRepo = payrollRepo;
        _attendanceRepo = attendanceRepo;
        _employeeRepo = employeeRepo;
    }

    public async Task Handle(
        GeneratePayrollCommand request,
        CancellationToken ct)
    {
        var employee = await _employeeRepo.GetByIdAsync(request.EmployeeId);
        if (employee is null)
            throw new Exception("Employee not found");

        var start = new DateOnly(request.Year, request.Month, 1);
        var end = start.AddMonths(1).AddDays(-1);

        var attendances = await _attendanceRepo
            .GetByDateRangeAsync(
                request.EmployeeId,
                start,
                end);

        decimal totalHours = 0;
        foreach (var a in attendances)
        {
            if (a.TotalHours.HasValue)
            {
                totalHours += a.TotalHours.Value;
            }
            else if (a.CheckIn.HasValue && a.CheckOut.HasValue)
            {
                var duration = a.CheckOut.Value - a.CheckIn.Value;
                totalHours += (decimal)duration.TotalHours;
            }
        }

        // Simple calculation for now:
        // Assuming separate salaries for Service vs Barista not handled here yet, using Barista salary as default or need logic.
        // For simplicity let's use ServiceSalary if Position matches, but we don't have Position here easily.
        // Let's use ServiceSalary as base for now or average. User script has service_salary and barista_salary.
        // Ideally we check the Shift -> Position to get the rate.
        // But let's stick to what we have (Employee).

        // TODO: Refine rate calculation based on Position
        decimal hourlyRate = (employee.ServiceSalary ?? 0) / (26 * 8);

        var payroll = new PayrollEntity
        {
            EmployeeId = request.EmployeeId,
            Month = request.Month,
            Year = request.Year,
            TotalSalary = Math.Round(hourlyRate * totalHours, 2),
            CreatedAt = DateTime.UtcNow
        };


        await _payrollRepo.AddAsync(payroll, ct);
    }
}
