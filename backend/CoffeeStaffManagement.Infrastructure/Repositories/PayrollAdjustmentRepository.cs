using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class PayrollAdjustmentRepository
    : IPayrollAdjustmentRepository
{
    private readonly AppDbContext _context;

    public PayrollAdjustmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        PayrollAdjustment adjustment,
        CancellationToken ct)
    {
        _context.PayrollAdjustments.Add(adjustment);
        await _context.SaveChangesAsync(ct);
    }
}
