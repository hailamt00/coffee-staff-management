using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class ScheduleRepository : IScheduleRepository
{
    private readonly AppDbContext _context;

    public ScheduleRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Schedule?> GetByIdAsync(int id)
    {
        return await _context.Schedules
            .Include(s => s.Employee)
            .Include(s => s.Shift)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<List<Schedule>> GetByDateAsync(DateOnly date)
    {
        return await _context.Schedules
            .Include(x => x.Employee)
            .Include(x => x.Shift)
            .Where(x => x.WorkDate == date)
            .OrderBy(x => x.Shift != null ? x.Shift.StartTime : null)
            .ToListAsync();
    }

    public async Task<Schedule?> GetAsync(int employeeId, int shiftId, DateOnly workDate)
    {
        return await _context.Schedules
            .Include(x => x.Shift)
            .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.ShiftId == shiftId && x.WorkDate == workDate);
    }

    public async Task AddAsync(Schedule schedule)
    {
        _context.Schedules.Add(schedule);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(
    int employeeId,
    int shiftId,
    DateOnly workDate)
    {
        return await _context.Schedules.AnyAsync(s =>
            s.EmployeeId == employeeId &&
            s.ShiftId == shiftId &&
            s.WorkDate == workDate
        );
    }
}
