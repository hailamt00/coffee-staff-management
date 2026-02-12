namespace CoffeeStaffManagement.Application.Dashboard.DTOs;

public record DashboardStatsDto(
    decimal TotalRevenue,
    decimal NetProfit,
    double AttendanceRate,
    int ActiveStaff,
    int LiveShifts,
    int TotalReports,
    List<DailyRevenueDto> ChartData
);

public record DailyRevenueDto(string Date, decimal Revenue, decimal Target);
