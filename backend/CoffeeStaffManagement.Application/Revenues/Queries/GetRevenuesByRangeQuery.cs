using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Queries;

public record GetRevenuesByRangeQuery(DateTime StartDate, DateTime EndDate) : IRequest<List<RevenueDto>>;

public class GetRevenuesByRangeQueryHandler : IRequestHandler<GetRevenuesByRangeQuery, List<RevenueDto>>
{
    private readonly IRevenueRepository _repo;

    public GetRevenuesByRangeQueryHandler(IRevenueRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<RevenueDto>> Handle(GetRevenuesByRangeQuery request, CancellationToken ct)
    {
        // Ensure end date is at end of day
        var end = request.EndDate.Date.AddDays(1).AddTicks(-1);
        var revenues = await _repo.GetByDateRangeAsync(request.StartDate.Date, end, ct);

        return revenues.Select(r => new RevenueDto
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
            Income = r.Income,
            InNote = r.InNote,
            Expenses = r.Expenses,
            ExNote = r.ExNote,
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
        }).ToList();
    }
}
