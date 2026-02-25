namespace CoffeeStaffManagement.Application.Revenues.DTOs;

public record CreateRevenueRequest(
    int ScheduleId,
    decimal OpeningBalance,
    decimal Cash,
    decimal Bank,
    decimal Income,
    decimal Expenses,
    string? Note
);
