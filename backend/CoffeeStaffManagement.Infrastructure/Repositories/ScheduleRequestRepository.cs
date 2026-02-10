using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ScheduleRequestRepository
    : IScheduleRequestRepository
{
    private readonly AppDbContext _context;

    public ScheduleRequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ScheduleRequest>> GetByEmployeeAsync(long employeeId)
    {
        return await _context.ScheduleRequests
            .Include(x => x.Shift)
            .Where(x => x.EmployeeId == employeeId)
            .OrderBy(x => x.WorkDate)
            .ToListAsync();
    }

    public async Task<List<ScheduleRequest>> GetByDateAsync(DateOnly date)
    {
        return await _context.ScheduleRequests
            .Include(x => x.Employee)
            .Include(x => x.Shift)
            .Where(x => x.WorkDate == date)
            .ToListAsync();
    }

    public async Task<ScheduleRequest?> GetByIdAsync(long id)
    {
        return await _context.ScheduleRequests
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(ScheduleRequest request)
    {
        _context.ScheduleRequests.Add(request);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ScheduleRequest request)
    {
        _context.ScheduleRequests.Update(request);
        await _context.SaveChangesAsync();
    }
}
