using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Commands;

public record CreateRevenueCommand(CreateRevenueRequest Request) : IRequest<RevenueDto>;

public class CreateRevenueCommandHandler : IRequestHandler<CreateRevenueCommand, RevenueDto>
{
    private readonly IRevenueRepository _revenueRepo;
    private readonly IScheduleRepository _scheduleRepo;
    private readonly ITransactionRepository _transactionRepo;

    public CreateRevenueCommandHandler(
        IRevenueRepository revenueRepo,
        IScheduleRepository scheduleRepo,
        ITransactionRepository transactionRepo)
    {
        _revenueRepo = revenueRepo;
        _scheduleRepo = scheduleRepo;
        _transactionRepo = transactionRepo;
    }

    public async Task<RevenueDto> Handle(CreateRevenueCommand request, CancellationToken ct)
    {
        var schedule = await _scheduleRepo.GetByIdAsync(request.Request.ScheduleId)
            ?? throw new KeyNotFoundException("Schedule not found");

        var existingRevenue = await _revenueRepo.GetByScheduleIdAsync(request.Request.ScheduleId, ct);
        if (existingRevenue != null)
        {
            throw new ArgumentException("Revenue report already exists for this schedule");
        }

        var totalRevenue = request.Request.Cash + request.Request.Bank;
        var net = totalRevenue;
        var deviation = 0m;

        var revenue = new Revenue
        {
            ScheduleId = request.Request.ScheduleId,
            EmployeeId = schedule.EmployeeId,
            OpeningBalance = request.Request.OpeningBalance,
            Cash = request.Request.Cash,
            Bank = request.Request.Bank,
            TotalRevenue = totalRevenue,
            Net = net,
            Deviation = deviation,
            Note = request.Request.Note,
            CreatedAt = DateTime.UtcNow
        };

        await _revenueRepo.AddAsync(revenue, ct);

        return new RevenueDto
        {
            Id = revenue.Id,
            ScheduleId = revenue.ScheduleId,
            EmployeeId = revenue.EmployeeId,
            EmployeeName = schedule.Employee?.Name ?? "Unknown",
            OpeningBalance = revenue.OpeningBalance,
            Cash = revenue.Cash,
            Bank = revenue.Bank,
            Income = 0,
            Expenses = 0,
            TotalRevenue = revenue.TotalRevenue,
            Net = revenue.Net,
            Deviation = revenue.Deviation,
            Note = revenue.Note,
            CreatedAt = revenue.CreatedAt
        };
    }
}
