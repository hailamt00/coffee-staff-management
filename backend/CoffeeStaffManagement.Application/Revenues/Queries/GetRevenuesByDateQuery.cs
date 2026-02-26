using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
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
            Expenses = r.Expenses,
            TotalRevenue = r.TotalRevenue,
            Net = r.Net,
            Deviation = r.Deviation,
            Note = r.Note,
            CreatedAt = r.CreatedAt
        }).ToList();
    }
}
