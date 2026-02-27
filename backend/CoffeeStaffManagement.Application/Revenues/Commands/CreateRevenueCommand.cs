using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Application.Transactions.DTOs;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;

namespace CoffeeStaffManagement.Application.Revenues.Commands;

public record CreateRevenueCommand(CreateRevenueRequest Request) : IRequest<RevenueDto>;

public class CreateRevenueCommandHandler : IRequestHandler<CreateRevenueCommand, RevenueDto>
{
    private readonly IRevenueRepository _revenueRepo;
    private readonly IScheduleRepository _scheduleRepo;
    private readonly IEmployeeRepository _employeeRepo;

    public CreateRevenueCommandHandler(
        IRevenueRepository revenueRepo,
        IScheduleRepository scheduleRepo,
        IEmployeeRepository employeeRepo)
    {
        _revenueRepo = revenueRepo;
        _scheduleRepo = scheduleRepo;
        _employeeRepo = employeeRepo;
    }

    public async Task<RevenueDto> Handle(CreateRevenueCommand request, CancellationToken ct)
    {
        var schedule = await _scheduleRepo.GetByIdAsync(request.Request.ScheduleId)
            ?? throw new KeyNotFoundException("Schedule not found");

        var submittedByEmployeeId = request.Request.EmployeeId ?? schedule.EmployeeId;
        var submittedByEmployee = await _employeeRepo.GetByIdAsync(submittedByEmployeeId);
        if (submittedByEmployee == null)
        {
            submittedByEmployeeId = schedule.EmployeeId;
            submittedByEmployee = await _employeeRepo.GetByIdAsync(submittedByEmployeeId);
        }
        var submittedAt = request.Request.SubmittedAt?.ToUniversalTime() ?? DateTime.UtcNow;
        var totalRevenue = request.Request.Cash + request.Request.Bank;
        var actualRevenue = totalRevenue - request.Request.OpeningBalance;
        var net = request.Request.Net ?? actualRevenue;
        var deviation = request.Request.Deviation ?? (actualRevenue - net);

        var existingRevenue = await _revenueRepo.GetByScheduleIdAsync(request.Request.ScheduleId, ct);
        if (existingRevenue != null)
        {
            existingRevenue.EmployeeId = submittedByEmployeeId;
            existingRevenue.OpeningBalance = request.Request.OpeningBalance;
            existingRevenue.Cash = request.Request.Cash;
            existingRevenue.Bank = request.Request.Bank;
            existingRevenue.TotalRevenue = totalRevenue;
            existingRevenue.Net = net;
            existingRevenue.Deviation = deviation;
            existingRevenue.Note = request.Request.Note;
            existingRevenue.CreatedAt = submittedAt;

            await _revenueRepo.UpdateAsync(existingRevenue, ct);

            return MapRevenueDto(existingRevenue, submittedByEmployee?.Name ?? "Unknown");
        }

        var revenue = new Revenue
        {
            ScheduleId = request.Request.ScheduleId,
            EmployeeId = submittedByEmployeeId,
            OpeningBalance = request.Request.OpeningBalance,
            Cash = request.Request.Cash,
            Bank = request.Request.Bank,
            TotalRevenue = totalRevenue,
            Net = net,
            Deviation = deviation,
            Note = request.Request.Note,
            CreatedAt = submittedAt
        };

        await _revenueRepo.AddAsync(revenue, ct);
        await _revenueRepo.SaveChangesAsync(ct);

        return MapRevenueDto(revenue, submittedByEmployee?.Name ?? "Unknown");
    }

    private static RevenueDto MapRevenueDto(Revenue revenue, string employeeName)
    {
        var income = revenue.Transactions?.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount) ?? 0;
        var expenses = revenue.Transactions?.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount) ?? 0;

        return new RevenueDto
        {
            Id = revenue.Id,
            ScheduleId = revenue.ScheduleId,
            EmployeeId = revenue.EmployeeId,
            EmployeeName = employeeName,
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
            Transactions = revenue.Transactions?.Select(t => new TransactionDto
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
