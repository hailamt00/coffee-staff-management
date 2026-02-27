using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Queries;

public record GetRevenueByScheduleQuery(int ScheduleId) : IRequest<RevenueDto?>;

public class GetRevenueByScheduleQueryHandler : IRequestHandler<GetRevenueByScheduleQuery, RevenueDto?>
{
    private readonly IRevenueRepository _repo;

    public GetRevenueByScheduleQueryHandler(IRevenueRepository repo)
    {
        _repo = repo;
    }

    public async Task<RevenueDto?> Handle(GetRevenueByScheduleQuery request, CancellationToken ct)
    {
        var revenue = await _repo.GetByScheduleIdAsync(request.ScheduleId, ct);
        if (revenue == null) return null;

        var income = revenue.Transactions?.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount) ?? 0;
        var expenses = revenue.Transactions?.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount) ?? 0;

        return new RevenueDto
        {
            Id = revenue.Id,
            ScheduleId = revenue.ScheduleId,
            EmployeeId = revenue.EmployeeId,
            EmployeeName = revenue.Employee?.Name ?? "Unknown",
            OpeningBalance = revenue.OpeningBalance,
            Cash = revenue.Cash,
            Bank = revenue.Bank,
            Income = income,
            Expenses = expenses,
            TotalRevenue = revenue.TotalRevenue,
            Net = revenue.Net,
            Deviation = revenue.Deviation,
            Note = revenue.Note,
            CreatedAt = revenue.CreatedAt,
            Transactions = revenue.Transactions?.Select(t => new CoffeeStaffManagement.Application.Transactions.DTOs.TransactionDto
            {
                Id = t.Id,
                RevenueId = t.RevenueId,
                Type = t.Type.ToString(),
                Amount = t.Amount,
                Reason = t.Description,
                CreatedAt = t.CreatedAt
            }).ToList() ?? new()
        };
    }
}
