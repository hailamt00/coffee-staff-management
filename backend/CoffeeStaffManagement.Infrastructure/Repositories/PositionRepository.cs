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
    {
        return await _context.Positions
            .OrderBy(p => p.Id)
            .ToListAsync();
    }

    public async Task<Position?> GetByIdAsync(int id)
    {
        return await _context.Positions
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<bool> ExistsAsync(string name, int? excludeId = null)
    {
        return await _context.Positions.AnyAsync(p =>
            p.Name == name &&
            (!excludeId.HasValue || p.Id != excludeId.Value)
        );
    }

    public async Task AddAsync(Position position)
    {
        _context.Positions.Add(position);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Position position)
    {
        _context.Positions.Update(position);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Position position)
    {
        _context.Positions.Remove(position);
        await _context.SaveChangesAsync();
    }
}
