using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class PositionRepository : GenericRepository<Position>, IPositionRepository
{
    public PositionRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<List<Position>> GetAllAsync()
        => await _context.Positions
            .Include(p => p.Shifts)
            .OrderBy(p => p.Name)
            .ToListAsync();

    public new async Task<Position?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _context.Positions
            .Include(p => p.Shifts)
            .FirstOrDefaultAsync(p => p.Id == id, ct);
}
