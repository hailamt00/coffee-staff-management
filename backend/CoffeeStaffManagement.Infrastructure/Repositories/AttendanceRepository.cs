using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class AttendanceRepository : IAttendanceRepository
{
    private readonly AppDbContext _context;

    public AttendanceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Attendance?> GetAsync(
        int employeeId,
        int shiftId,
        DateOnly workDate)
    {
        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Schedule)
                .ThenInclude(s => s!.Shift)
            .FirstOrDefaultAsync(a =>
                a.EmployeeId == employeeId &&
                a.Schedule != null &&
                a.Schedule.ShiftId == shiftId &&
                a.Schedule.WorkDate == workDate);
    }

    public async Task<List<Attendance>> GetByDateAsync(DateOnly workDate)
    {
        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Schedule)
            .ThenInclude(s => s!.Shift)
            .Where(a => a.Schedule != null && a.Schedule.WorkDate == workDate)
            .OrderBy(a => a.EmployeeId)
            .ToListAsync();
    }


    public async Task<List<Attendance>> GetByDateRangeAsync(
    int employeeId,
    DateOnly fromDate,
    DateOnly toDate)
    {
        return await _context.Attendances
            .Include(a => a.Schedule)
            .Where(a =>
                a.EmployeeId == employeeId &&
                a.Schedule != null &&
                a.Schedule.WorkDate >= fromDate &&
                a.Schedule.WorkDate <= toDate &&
                a.CheckIn != null)
            .ToListAsync();
    }


    public async Task AddAsync(
        Attendance attendance,
        CancellationToken ct)
    {
        _context.Attendances.Add(attendance);
        await _context.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(
        Attendance attendance,
        CancellationToken ct)
    {
        _context.Attendances.Update(attendance);
        await _context.SaveChangesAsync(ct);
    }
}
