using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Application.Transactions.DTOs;

public class TransactionDto
{
    public int Id { get; set; }
    public int RevenueId { get; set; }
    public string Type { get; set; } = null!;
    public decimal Amount { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
}

public record CreateTransactionRequest(
    int RevenueId,
    TransactionType Type, // "Income" or "Expense"
    decimal Amount,
    string? Reason
);
