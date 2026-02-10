using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class PositionRepository : IPositionRepository
{
    private readonly AppDbContext _context;

    public PositionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Position>> GetAllAsync()
        => await _context.Positions
            .Include(p => p.Shifts)
            .OrderBy(p => p.Name)
            .ToListAsync();

    public async Task<Position?> GetByIdAsync(int id)
        => await _context.Positions
            .Include(p => p.Shifts)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Position position)
    {
        _context.Positions.Add(position);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Position position)
    {
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Position position)
    {
        _context.Positions.Remove(position);
        await _context.SaveChangesAsync();
    }
}
