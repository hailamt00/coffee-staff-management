namespace CoffeeStaffManagement.Application.Revenues.DTOs;

public record CreateRevenueRequest(
    int ScheduleId,
    decimal OpeningBalance,
    decimal Cash,
    decimal Bank,
    string? Note,
    decimal Expenses = 0,
    decimal Income = 0,
    string? InNote = null,
    string? ExNote = null,
    int? EmployeeId = null,
    DateTime? SubmittedAt = null,
    decimal? Net = null,
    decimal? Deviation = null

);
