using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
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

        return new RevenueDto
        {
            Id = revenue.Id,
            ScheduleId = revenue.ScheduleId,
            EmployeeId = revenue.EmployeeId,
            EmployeeName = revenue.Employee?.Name ?? "Unknown",
            OpeningBalance = revenue.OpeningBalance,
            Cash = revenue.Cash,
            Bank = revenue.Bank,
            TotalRevenue = revenue.TotalRevenue,
            Net = revenue.Net,
            Deviation = revenue.Deviation,
            Note = revenue.Note,
            CreatedAt = revenue.CreatedAt
        };
    }
}
