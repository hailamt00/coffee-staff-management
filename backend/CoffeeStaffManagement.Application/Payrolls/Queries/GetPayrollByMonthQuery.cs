using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Payrolls.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using System.Linq;

namespace CoffeeStaffManagement.Application.Payrolls.Queries;

public record GetPayrollByMonthQuery(int Month, int Year) : IRequest<List<PayrollDto>>;

public class GetPayrollByMonthQueryHandler : IRequestHandler<GetPayrollByMonthQuery, List<PayrollDto>>
{
    private readonly IPayrollRepository _repo;
    private readonly IRewardPenaltyRepository _rewardPenaltyRepo;

    public GetPayrollByMonthQueryHandler(IPayrollRepository repo, IRewardPenaltyRepository rewardPenaltyRepo)
    {
        _repo = repo;
        _rewardPenaltyRepo = rewardPenaltyRepo;
    }

    public async Task<List<PayrollDto>> Handle(GetPayrollByMonthQuery request, CancellationToken cancellationToken)
    {
        var payrolls = await _repo.GetByMonthAsync(request.Month, request.Year, cancellationToken);
        var adjustments = await _rewardPenaltyRepo.GetAllAsync(request.Month, request.Year);
        var adjustmentGroups = adjustments.GroupBy(a => a.EmployeeId).ToDictionary(g => g.Key, g => g.ToList());

        return payrolls.Select(p =>
        {
            var totalHours = p.Details.Sum(d => d.Hours);
            var baseSalary = p.Details.Sum(d => d.Amount);

            var empAdjustments = adjustmentGroups.ContainsKey(p.EmployeeId) ? adjustmentGroups[p.EmployeeId] : new List<RewardPenalty>();

            var rewards = empAdjustments
                                   .Where(rp => rp.Type?.Type == RewardPenaltyKind.Reward)
                                   .Sum(rp => rp.Amount);

            var penalties = empAdjustments
                                     .Where(rp => rp.Type?.Type == RewardPenaltyKind.Penalty)
                                     .Sum(rp => rp.Amount);

            // Compute late minutes correctly
            var lateMinutes = 0;
            foreach (var d in p.Details)
            {
                var attendance = d.Attendance;
                if (attendance != null && attendance.CheckIn.HasValue && attendance.Schedule?.Shift?.StartTime != null)
                {
                    var shiftStart = attendance.Schedule.Shift.StartTime.Value;
                    if (attendance.CheckIn.Value.TimeOfDay > shiftStart)
                    {
                        lateMinutes += (int)(attendance.CheckIn.Value.TimeOfDay - shiftStart).TotalMinutes;
                    }
                }
            }

            return new PayrollDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee?.Name ?? "Unknown",
                EmployeePhone = p.Employee?.Phone ?? "Unknown",
                PositionName = p.Details.FirstOrDefault()?.Attendance?.Schedule?.Shift?.Position?.Name ?? "N/A",
                Month = p.Month,
                Year = p.Year,
                TotalHours = totalHours,
                BaseSalary = baseSalary,
                TotalRewards = rewards,
                TotalPenalties = penalties,
                TotalLateMinutes = lateMinutes,
                TotalSalary = p.TotalSalary,
                CreatedAt = p.CreatedAt,
                Details = p.Details.OrderBy(d => d.Attendance?.Schedule?.WorkDate).Select(d => new PayrollDetailDto
                {
                    Id = d.Id,
                    WorkDate = d.Attendance?.Schedule?.WorkDate.ToString("yyyy-MM-dd") ?? "",
                    ShiftName = d.Attendance?.Schedule?.Shift?.Name ?? "",
                    PositionName = d.Attendance?.Schedule?.Shift?.Position?.Name ?? "",
                    CheckIn = d.Attendance?.CheckIn?.ToString("HH:mm"),
                    CheckOut = d.Attendance?.CheckOut?.ToString("HH:mm"),
                    Status = d.Attendance?.CheckIn.HasValue == true ? (d.Attendance.CheckOut.HasValue ? "Hoàn thành" : "Thiếu Check-out") : "Vắng",
                    Hours = d.Hours,
                    Amount = d.Amount,
                    Note = d.Attendance?.Note
                }).ToList()
            };
        }).ToList();
    }
}
