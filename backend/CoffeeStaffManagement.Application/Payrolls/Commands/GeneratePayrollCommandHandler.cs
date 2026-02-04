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

        var monthDate = DateOnly.Parse(request.Month + "-01");
        var start = monthDate;
        var end = monthDate.AddMonths(1).AddDays(-1);

        var attendances = await _attendanceRepo
            .GetByDateRangeAsync(
                request.EmployeeId,
                start,
                end);

        decimal totalHours = attendances
            .Where(a => a.CheckIn.HasValue && a.CheckOut.HasValue)
            .Sum(a =>
            {
                var hours =
                    a.CheckOut!.Value.ToTimeSpan()
                    - a.CheckIn!.Value.ToTimeSpan();

                return hours.TotalHours > 0
                    ? (decimal)hours.TotalHours
                    : 0;
            });


        var hourlyRate = employee.SalaryBar / (26 * 8);

        var payroll = new PayrollEntity
        {
            EmployeeId = request.EmployeeId,
            Month = request.Month,
            TotalHours = totalHours,
            BaseSalary = employee.SalaryBar,
            TotalSalary = Math.Round(hourlyRate * totalHours, 2),
        };


        await _payrollRepo.AddAsync(payroll, ct);
    }
}
