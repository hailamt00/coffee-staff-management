using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using PayrollEntity = CoffeeStaffManagement.Domain.Entities.Payroll;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace CoffeeStaffManagement.Application.Payroll.Commands;

public class GeneratePayrollCommandHandler
    : IRequestHandler<GeneratePayrollCommand>
{
    private readonly IPayrollRepository _payrollRepo;
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IEmployeeRepository _employeeRepo;
    private readonly IRewardPenaltyRepository _rewardPenaltyRepo;

    public GeneratePayrollCommandHandler(
        IPayrollRepository payrollRepo,
        IAttendanceRepository attendanceRepo,
        IEmployeeRepository employeeRepo,
        IRewardPenaltyRepository rewardPenaltyRepo)
    {
        _payrollRepo = payrollRepo;
        _attendanceRepo = attendanceRepo;
        _employeeRepo = employeeRepo;
        _rewardPenaltyRepo = rewardPenaltyRepo;
    }

    public async Task Handle(
        GeneratePayrollCommand request,
        CancellationToken ct)
    {
        var employeesToProcess = new List<Employee>();
        if (request.EmployeeId == 0)
        {
            employeesToProcess = (await _employeeRepo.ListAllAsync(ct)).ToList();
        }
        else
        {
            var employee = await _employeeRepo.GetByIdAsync(request.EmployeeId, ct);
            if (employee is null)
                throw new Exception("Employee not found");
            employeesToProcess.Add(employee);
        }

        var start = new DateOnly(request.Year, request.Month, 1);
        var end = start.AddMonths(1).AddDays(-1);

        // Get all existing payrolls for the month to avoid duplicates
        var existingPayrolls = await _payrollRepo.GetByMonthAsync(request.Month, request.Year, ct);

        foreach (var employee in employeesToProcess)
        {
            // Remove existing payroll if any
            var existing = existingPayrolls.FirstOrDefault(p => p.EmployeeId == employee.Id);
            if (existing != null)
            {
                _payrollRepo.Delete(existing);
            }

            var attendances = await _attendanceRepo
                .GetByDateRangeAsync(employee.Id, start, end);

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

                var positionName = a.Schedule?.Shift?.Position?.Name ?? "";
                // serviceSalary / baristaSalary = hourly rate (VND/hour)
                decimal hourlyRate = employee.ServiceSalary ?? 0;

                if (positionName.Contains("Barista", StringComparison.OrdinalIgnoreCase)
                    || positionName.Contains("Pha chế", StringComparison.OrdinalIgnoreCase))
                {
                    hourlyRate = employee.BaristaSalary ?? 0;
                }

                decimal amount = Math.Round(hours * hourlyRate, 0);

                details.Add(new PayrollDetail
                {
                    AttendanceId = a.Id,
                    Hours = Math.Round(hours, 2),
                    Rate = Math.Round(hourlyRate, 0),
                    Amount = amount
                });

                totalSalary += amount;
            }

            // Step 2: Link adjustments (Rewards/Penalties)
            var adjustments = await _rewardPenaltyRepo.GetByEmployeeIdAsync(employee.Id, request.Month, request.Year);
            foreach (var rp in adjustments)
            {
                if (rp.Type?.Type == RewardPenaltyKind.Reward)
                {
                    totalSalary += rp.Amount;
                }
                else if (rp.Type?.Type == RewardPenaltyKind.Penalty)
                {
                    totalSalary -= rp.Amount;
                }
            }

            var payroll = new PayrollEntity
            {
                EmployeeId = employee.Id,
                Month = request.Month,
                Year = request.Year,
                TotalSalary = Math.Round(totalSalary, 2),
                CreatedAt = DateTime.UtcNow,
                Details = details
            };

            await _payrollRepo.AddAsync(payroll, ct);
        }

        await _payrollRepo.SaveChangesAsync(ct);
    }
}
