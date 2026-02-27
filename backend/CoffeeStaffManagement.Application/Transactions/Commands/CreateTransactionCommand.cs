using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Transactions.DTOs;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Transactions.Commands;

public record CreateTransactionCommand(CreateTransactionRequest Request) : IRequest<TransactionDto>;

public class CreateTransactionCommandHandler : IRequestHandler<CreateTransactionCommand, TransactionDto>
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IRevenueRepository _revenueRepo;

    public CreateTransactionCommandHandler(ITransactionRepository transactionRepo, IRevenueRepository revenueRepo)
    {
        _transactionRepo = transactionRepo;
        _revenueRepo = revenueRepo;
    }

    public async Task<TransactionDto> Handle(CreateTransactionCommand request, CancellationToken ct)
    {
        var revenue = await _revenueRepo.GetByIdAsync(request.Request.RevenueId, ct)
            ?? throw new Exception("Revenue record not found");
        var transaction = new Transaction
        {
            RevenueId = request.Request.RevenueId,
            Type = request.Request.Type,
            Amount = request.Request.Amount,
            Description = request.Request.Reason,
            CreatedAt = DateTime.UtcNow
        };

        await _transactionRepo.AddAsync(transaction, ct);
        await _transactionRepo.SaveChangesAsync(ct);

        var allTransactions = await _transactionRepo.GetByRevenueIdAsync(request.Request.RevenueId, ct);
        decimal income = 0m;
        decimal expenses = 0m;

        foreach (var item in allTransactions)
        {
            if (item.Type == TransactionType.Income) income += item.Amount;
            if (item.Type == TransactionType.Expense) expenses += item.Amount;
        }

        var actualRevenue = revenue.Cash + revenue.Bank - revenue.OpeningBalance + expenses - income;
        revenue.Deviation = actualRevenue - revenue.Net;

        await _revenueRepo.UpdateAsync(revenue, ct);

        return new TransactionDto
        {
            Id = transaction.Id,
            RevenueId = transaction.RevenueId,
            Type = transaction.Type.ToString(),
            Amount = transaction.Amount,
            Reason = transaction.Description,
            CreatedAt = transaction.CreatedAt
        };
    }
}
