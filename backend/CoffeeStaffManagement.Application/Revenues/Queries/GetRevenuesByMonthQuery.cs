using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
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
