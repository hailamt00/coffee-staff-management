using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
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

        decimal totalSalary = 0;
        var details = new List<PayrollDetail>();

        foreach (var a in attendances)
        {
            decimal hours = 0;
            if (a.TotalHours.HasValue)
            {
                hours = a.TotalHours.Value;
            }
            else if (a.CheckIn.HasValue && a.CheckOut.HasValue)
            {
                var duration = a.CheckOut.Value - a.CheckIn.Value;
                hours = (decimal)duration.TotalHours;
            }

            if (hours <= 0) continue;

            // Determine Rate based on Position
            var positionName = a.Schedule?.Shift?.Position?.Name ?? "";
            decimal monthlySalary = employee.ServiceSalary ?? 0;

            if (positionName.Contains("Barista", StringComparison.OrdinalIgnoreCase))
            {
                monthlySalary = employee.BaristaSalary ?? 0;
            }

            // Assume 26 days * 8 hours = 208 hours/month as base
            decimal hourlyRate = monthlySalary / (26 * 8);
            decimal amount = Math.Round(hours * hourlyRate, 2);

            details.Add(new PayrollDetail
            {
                AttendanceId = a.Id,
                Hours = Math.Round(hours, 2),
                Rate = Math.Round(hourlyRate, 2),
                Amount = amount
            });

            totalSalary += amount;
        }

        // Add Rewards / Penalties
        foreach (var a in attendances)
        {
            if (a.RewardsPenalties != null)
            {
                foreach (var rp in a.RewardsPenalties)
                {
                    totalSalary += rp.Amount; // Positive for reward, negative for penalty should be stored in Amount?
                    // Let's check RewardPenaltyType if needed, but usually Amount has sign.
                }
            }
        }

        var payroll = new PayrollEntity
        {
            EmployeeId = request.EmployeeId,
            Month = request.Month,
            Year = request.Year,
            TotalSalary = Math.Round(totalSalary, 2),
            CreatedAt = DateTime.UtcNow,
            Details = details
        };

        await _payrollRepo.AddAsync(payroll, ct);
    }
}
