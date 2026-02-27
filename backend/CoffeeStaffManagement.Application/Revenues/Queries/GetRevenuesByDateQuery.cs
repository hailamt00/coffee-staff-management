using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Queries;

public record GetRevenuesByDateQuery(DateTime Date) : IRequest<List<RevenueDto>>;

public class GetRevenuesByDateQueryHandler : IRequestHandler<GetRevenuesByDateQuery, List<RevenueDto>>
{
    private readonly IRevenueRepository _repo;

    public GetRevenuesByDateQueryHandler(IRevenueRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RevenueDto>> Handle(GetRevenuesByDateQuery request, CancellationToken ct)
    {
        var start = request.Date.ToUniversalTime().Date;
        var end = start.AddDays(1).AddTicks(-1);

        var revenues = await _repo.GetByDateRangeAsync(start, end, ct);

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
