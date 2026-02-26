using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class PayrollRepository : GenericRepository<Payroll>, IPayrollRepository
{
    public PayrollRepository(AppDbContext context) : base(context)
    {
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

    public new async Task<Payroll?> GetByIdAsync(
        int payrollId,
        CancellationToken ct)
    {
        return await _context.Payrolls
            .FirstOrDefaultAsync(p => p.Id == payrollId, ct);
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
            .Include(p => p.Details)
                .ThenInclude(d => d.Attendance)
                    .ThenInclude(a => a!.Schedule)
                        .ThenInclude(s => s!.Shift)
                            .ThenInclude(sh => sh!.Position)
            .Include(p => p.Details)
                .ThenInclude(d => d.Attendance)
                    .ThenInclude(a => a!.RewardsPenalties)
                        .ThenInclude(r => r.Type)
            .Where(p =>
                p.Month == month &&
                p.Year == year)
            .ToListAsync(ct);
    }
}
