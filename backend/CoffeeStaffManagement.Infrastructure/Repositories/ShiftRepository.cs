using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ShiftRepository : GenericRepository<Shift>, IShiftRepository
{
    public ShiftRepository(AppDbContext context) : base(context)
    {
    }

    public new async Task<Shift?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.Shifts
            .Include(s => s.Position)
            .FirstOrDefaultAsync(s => s.Id == id, ct);
    }

    public async Task<List<Shift>> GetAllAsync()
    {
        return await _context.Shifts
            .Include(s => s.Position)
            .ToListAsync();
    }
}
