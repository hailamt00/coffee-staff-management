using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class LeaveRequestRepository : ILeaveRequestRepository
{
    private readonly AppDbContext _context;

    public LeaveRequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(LeaveRequest leave, CancellationToken ct)
    {
        _context.LeaveRequests.Add(leave);
        await _context.SaveChangesAsync(ct);
    }

    public async Task<LeaveRequest?> GetByIdAsync(int id)
    {
        return await _context.LeaveRequests
            .Include(l => l.Employee)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<List<LeaveRequest>> GetAllAsync()
    {
        return await _context.LeaveRequests
            .Include(l => l.Employee)
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();
    }

    public async Task UpdateAsync(LeaveRequest leave, CancellationToken ct)
    {
        _context.LeaveRequests.Update(leave);
        await _context.SaveChangesAsync(ct);
    }
}
