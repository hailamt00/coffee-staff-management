using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class EmployeeShiftRequestRepository
    : IEmployeeShiftRequestRepository
{
    private readonly AppDbContext _context;

    public EmployeeShiftRequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeeShiftRequest>> GetByEmployeeAsync(long employeeId)
    {
        return await _context.EmployeeShiftRequests
            .Include(x => x.Shift)
            .Where(x => x.EmployeeId == employeeId)
            .OrderBy(x => x.WorkDate)
            .ToListAsync();
    }

    public async Task<List<EmployeeShiftRequest>> GetByDateAsync(DateOnly date)
    {
        return await _context.EmployeeShiftRequests
            .Include(x => x.Employee)
            .Include(x => x.Shift)
            .Where(x => x.WorkDate == date)
            .ToListAsync();
    }

    public async Task<EmployeeShiftRequest?> GetByIdAsync(long id)
    {
        return await _context.EmployeeShiftRequests
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(EmployeeShiftRequest request)
    {
        _context.EmployeeShiftRequests.Add(request);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(EmployeeShiftRequest request)
    {
        _context.EmployeeShiftRequests.Update(request);
        await _context.SaveChangesAsync();
    }
}
