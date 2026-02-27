namespace CoffeeStaffManagement.Application.Revenues.DTOs;

public record CreateRevenueRequest(
    int ScheduleId,
    decimal OpeningBalance,
    decimal Cash,
    decimal Bank,
    string? Note,
    int? EmployeeId = null,
    DateTime? SubmittedAt = null,
    decimal? Net = null,
    decimal? Deviation = null
);
