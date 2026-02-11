using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class PayrollRepository : IPayrollRepository
{
    private readonly AppDbContext _context;

    public PayrollRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Payroll?> GetAsync(
        int employeeId,
        int month,
        int year,
        CancellationToken ct)
    {
        return await _context.Payrolls
            .FirstOrDefaultAsync(p =>
                p.EmployeeId == employeeId &&
                p.Month == month &&
                p.Year == year,
                ct);
    }

    public async Task<Payroll?> GetByIdAsync(
        int payrollId,
        CancellationToken ct)
    {
        return await _context.Payrolls
            .FirstOrDefaultAsync(p => p.Id == payrollId, ct);
    }

    public async Task AddAsync(
        Payroll payroll,
        CancellationToken ct)
    {
        await _context.Payrolls.AddAsync(payroll, ct);
        await _context.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(
        Payroll payroll,
        CancellationToken ct)
    {
        _context.Payrolls.Update(payroll);
        await _context.SaveChangesAsync(ct);
    }
    public async Task<List<Payroll>> GetByMonthAsync(
        int month,
        int year,
        CancellationToken ct)
    {
        return await _context.Payrolls
            .Include(p => p.Employee) // Include Employee for name
            .Where(p =>
                p.Month == month &&
                p.Year == year)
            .ToListAsync(ct);
    }
}
