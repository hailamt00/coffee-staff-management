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

    public async Task<List<Schedule>> GetByDateAsync(DateOnly date)
    {
        return await _context.Schedules
            .Include(x => x.Employee)
            .Include(x => x.Shift)
            .Where(x => x.WorkDate == date)
            .OrderBy(x => x.Shift.StartTime)
            .ToListAsync();
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
