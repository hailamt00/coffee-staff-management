using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class RewardPenaltyRepository : IRewardPenaltyRepository
{
    private readonly AppDbContext _context;

    public RewardPenaltyRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<RewardPenaltyType>> GetTypesAsync()
    {
        return await _context.RewardPenaltyTypes.ToListAsync();
    }

    public async Task<RewardPenaltyType?> GetTypeByIdAsync(int id)
    {
        return await _context.RewardPenaltyTypes.FindAsync(id);
    }

    public async Task AddTypeAsync(RewardPenaltyType type)
    {
        _context.RewardPenaltyTypes.Add(type);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTypeAsync(RewardPenaltyType type)
    {
        _context.RewardPenaltyTypes.Update(type);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTypeAsync(RewardPenaltyType type)
    {
        _context.RewardPenaltyTypes.Remove(type);
        await _context.SaveChangesAsync();
    }

    public async Task<List<RewardPenalty>> GetByEmployeeIdAsync(int employeeId, int month, int year)
    {
        return await _context.RewardPenalties
            .Include(r => r.Type)
            .Where(r => r.EmployeeId == employeeId &&
                        r.CreatedAt.Month == month &&
                        r.CreatedAt.Year == year)
            .ToListAsync();
    }

    public async Task<List<RewardPenalty>> GetAllAsync(int month, int year)
    {
        return await _context.RewardPenalties
            .Include(r => r.Type)
            .Include(r => r.Employee)
            .Where(r => r.CreatedAt.Month == month &&
                        r.CreatedAt.Year == year)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task AddAsync(RewardPenalty rewardPenalty)
    {
        _context.RewardPenalties.Add(rewardPenalty);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(RewardPenalty rewardPenalty)
    {
        _context.RewardPenalties.Remove(rewardPenalty);
        await _context.SaveChangesAsync();
    }
}
