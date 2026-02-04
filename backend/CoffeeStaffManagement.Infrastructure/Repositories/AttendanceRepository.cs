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
            .FirstOrDefaultAsync(a =>
                a.EmployeeId == employeeId &&
                a.ShiftId == shiftId &&
                a.WorkDate == workDate);
    }

    public async Task<List<Attendance>> GetByDateAsync(DateOnly workDate)
    {
        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Shift)
            .Where(a => a.WorkDate == workDate)
            .OrderBy(a => a.EmployeeId)
            .ToListAsync();
    }


    public async Task<List<Attendance>> GetByDateRangeAsync(
    int employeeId,
    DateOnly fromDate,
    DateOnly toDate)
    {
        return await _context.Attendances
            .Where(a =>
                a.EmployeeId == employeeId &&
                a.WorkDate >= fromDate &&
                a.WorkDate <= toDate &&
                a.Status == "present")
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
