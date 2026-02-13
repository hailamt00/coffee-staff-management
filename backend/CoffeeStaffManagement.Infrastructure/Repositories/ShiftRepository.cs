using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ShiftRepository : IShiftRepository
{
    private readonly AppDbContext _context;

    public ShiftRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Shift?> GetByIdAsync(int id)
    {
        return await _context.Shifts
            .Include(s => s.Position)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<List<Shift>> GetAllAsync()
    {
        return await _context.Shifts
            .Include(s => s.Position)
            .ToListAsync();
    }
}
