using MediatR;
using CoffeeStaffManagement.Application.Dashboard.DTOs;
using CoffeeStaffManagement.Application.Common.Interfaces;

namespace CoffeeStaffManagement.Application.Dashboard.Queries;

public record GetDashboardStatsQuery : IRequest<DashboardStatsDto>;

public class GetDashboardStatsQueryHandler : IRequestHandler<GetDashboardStatsQuery, DashboardStatsDto>
{
    private readonly IRevenueRepository _revenueRepo;
    private readonly IAttendanceRepository _attendanceRepo;
    private readonly IScheduleRepository _scheduleRepo;
    private readonly IEmployeeRepository _employeeRepo;

    public GetDashboardStatsQueryHandler(
        IRevenueRepository revenueRepo,
        IAttendanceRepository attendanceRepo,
        IScheduleRepository scheduleRepo,
        IEmployeeRepository employeeRepo)
    {
        _revenueRepo = revenueRepo;
        _attendanceRepo = attendanceRepo;
        _scheduleRepo = scheduleRepo;
        _employeeRepo = employeeRepo;
    }

    public async Task<DashboardStatsDto> Handle(GetDashboardStatsQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        const int VnTimeOffset = 7;
        var today = DateOnly.FromDateTime(now.AddHours(VnTimeOffset)); // User is in +07:00
        var startOfMonth = new DateOnly(today.Year, today.Month, 1);
        var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

        // 1. Revenue & Net Profit (This Month)
        // Convert VN Start of Month (00:00) to UTC (Minus 7 hours)
        var revStart = new DateTime(today.Year, today.Month, 1, 0, 0, 0, DateTimeKind.Unspecified);
        revStart = DateTime.SpecifyKind(revStart.AddHours(-7), DateTimeKind.Utc);
        var revEnd = now;

        var revenues = await _revenueRepo.GetByDateRangeAsync(revStart, revEnd, cancellationToken);
        var totalRevenue = revenues.Sum(r => r.TotalRevenue);
        var netProfit = revenues.Sum(r => r.Net);
        var totalReports = revenues.Count;

        // 2. Attendance Rate (This Month)
        var schedules = await _scheduleRepo.GetByDateRangeAsync(startOfMonth, today); // Up to today
        var attendances = await _attendanceRepo.GetByDateRangeAsync(startOfMonth, today);

        var scheduledShifts = schedules.Count;
        var attendedShifts = attendances.Count; // Assuming 1 attendance per shift

        double attendanceRate = 0;
        if (scheduledShifts > 0)
        {
            attendanceRate = (double)attendedShifts / scheduledShifts * 100;
        }

        // 3. Active Staff
        var employees = await _employeeRepo.GetAllAsync(null);
        var activeStaff = employees.Count(e => e.Status);

        // 4. Live Shifts
        // Shifts that are currently happening.
        // Needs logic to check overlap with Now.TimeOfDay (VN Time).
        var todaySchedules = schedules.Where(s => s.WorkDate == today).ToList();
        var vnTimeNow = TimeOnly.FromDateTime(now.AddHours(7));
        var liveShifts = todaySchedules.Count(s =>
            s.Shift != null &&
            s.Shift.StartTime.HasValue &&
            s.Shift.EndTime.HasValue &&
            IsShiftActive(s.Shift.StartTime.Value, s.Shift.EndTime.Value, vnTimeNow)
        );

        // 5. Chart Data (Daily breakdown for this month)
        // Group revenues by Date
        var chartData = revenues
            .GroupBy(r => r.CreatedAt.Date)
            .Select(g => new DailyRevenueDto(
                Date: g.Key.ToString("dd/MM"),
                Revenue: g.Sum(x => x.TotalRevenue),
                Target: 5000000 // Hardcoded target for now, or calculate based on logic
            ))
            .OrderBy(x => x.Date)
            .ToList();

        // Fill missing days? Optional. For now, just return what we have.

        return new DashboardStatsDto(
            TotalRevenue: totalRevenue,
            NetProfit: netProfit,
            AttendanceRate: Math.Round(attendanceRate, 1),
            ActiveStaff: activeStaff,
            LiveShifts: liveShifts,
            TotalReports: totalReports,
            ChartData: chartData
        );
    }

    private bool IsShiftActive(TimeSpan start, TimeSpan end, TimeOnly now)
    {
        // Convert TimeSpan to TimeOnly for easier comparison, or just compare
        var s = TimeOnly.FromTimeSpan(start);
        var e = TimeOnly.FromTimeSpan(end);

        // Handle overnight shifts if necessary (e < s)
        if (e < s)
        {
            return now >= s || now <= e;
        }
        return now >= s && now <= e;
    }
}
