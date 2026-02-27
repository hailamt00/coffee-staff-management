using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Queries;

public record GetRevenuesByMonthQuery(int Month, int Year) : IRequest<List<RevenueDto>>;

public class GetRevenuesByMonthQueryHandler : IRequestHandler<GetRevenuesByMonthQuery, List<RevenueDto>>
{
    private readonly IRevenueRepository _repo;

    public GetRevenuesByMonthQueryHandler(IRevenueRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RevenueDto>> Handle(GetRevenuesByMonthQuery request, CancellationToken ct)
    {
        var revenues = await _repo.GetByMonthAsync(request.Month, request.Year, ct);

        return revenues.Select(r =>
        {
            var income = r.Transactions?.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount) ?? 0;
            var expenses = r.Transactions?.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount) ?? 0;

            return new RevenueDto
            {
                Id = r.Id,
                ScheduleId = r.ScheduleId,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee?.Name ?? "Unknown",
                ShiftName = r.Schedule?.Shift?.Name ?? "",
                PositionName = r.Schedule?.Shift?.Position?.Name ?? "",
                WorkDate = r.Schedule?.WorkDate.ToString("yyyy-MM-dd") ?? r.CreatedAt.ToString("yyyy-MM-dd"),
                OpeningBalance = r.OpeningBalance,
                Cash = r.Cash,
                Bank = r.Bank,
                Income = income,
                Expenses = expenses,
                TotalRevenue = r.TotalRevenue,
                Net = r.Net,
                Deviation = r.Deviation,
                Note = r.Note,
                CreatedAt = r.CreatedAt,
                Transactions = r.Transactions?.Select(t => new CoffeeStaffManagement.Application.Transactions.DTOs.TransactionDto
                {
                    Id = t.Id,
                    RevenueId = t.RevenueId,
                    Type = t.Type.ToString(),
                    Amount = t.Amount,
                    Reason = t.Description,
                    CreatedAt = t.CreatedAt
                }).ToList() ?? new()
            };
        }).ToList();
    }
}
