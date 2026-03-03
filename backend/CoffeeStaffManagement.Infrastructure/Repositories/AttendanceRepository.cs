using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class AttendanceRepository : GenericRepository<Attendance>, IAttendanceRepository
{
    public AttendanceRepository(AppDbContext context) : base(context)
    {
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
        var fromDateTime = workDate.ToDateTime(TimeOnly.MinValue);
        var toDateTime = workDate.ToDateTime(TimeOnly.MaxValue).AddTicks(-1);

        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Schedule)
            .ThenInclude(s => s!.Shift)
            .Where(a =>
                (a.Schedule != null && a.Schedule.WorkDate == workDate) ||
                (a.Schedule == null && a.CheckIn != null && a.CheckIn >= fromDateTime && a.CheckIn <= toDateTime))
            .OrderBy(a => a.EmployeeId)
            .ToListAsync();
    }


    public async Task<List<Attendance>> GetByDateRangeAsync(
    int employeeId,
    DateOnly fromDate,
    DateOnly toDate)
    {
        var fromDateTime = fromDate.ToDateTime(TimeOnly.MinValue);
        var toDateTime = toDate.ToDateTime(TimeOnly.MaxValue).AddTicks(-1);

        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Schedule)
                .ThenInclude(s => s!.Employee)
            .Include(a => a.Schedule)
                .ThenInclude(s => s!.Shift)
                    .ThenInclude(sh => sh!.Position)
            .Include(a => a.RewardsPenalties)
            .Where(a =>
                a.EmployeeId == employeeId &&
                a.CheckIn != null &&
                ((a.Schedule != null && a.Schedule.WorkDate >= fromDate && a.Schedule.WorkDate <= toDate) ||
                 (a.Schedule == null && a.CheckIn >= fromDateTime && a.CheckIn <= toDateTime)))
            .ToListAsync();
    }


    public async Task<List<Attendance>> GetByDateRangeAsync(DateOnly fromDate, DateOnly toDate)
    {
        var fromDateTime = fromDate.ToDateTime(TimeOnly.MinValue);
        var toDateTime = toDate.ToDateTime(TimeOnly.MaxValue).AddTicks(-1);

        return await _context.Attendances
            .Include(a => a.Employee)
            .Include(a => a.Schedule)
                .ThenInclude(s => s!.Employee)
            .Include(a => a.Schedule)
                .ThenInclude(s => s!.Shift)
                    .ThenInclude(sh => sh!.Position)
            .Where(a =>
                (a.Schedule != null && a.Schedule.WorkDate >= fromDate && a.Schedule.WorkDate <= toDate) ||
                (a.Schedule == null && a.CheckIn != null && a.CheckIn >= fromDateTime && a.CheckIn <= toDateTime))
            .ToListAsync();
    }


    public new async Task AddAsync(
        Attendance attendance,
        CancellationToken ct)
    {
        _context.Attendances.Add(attendance);
        await _context.SaveChangesAsync(ct);
    }

    public async Task<Attendance?> GetByIdAsync(int id)
    {
        return await _context.Attendances.FindAsync(id);
    }

    public async Task UpdateAsync(
        Attendance attendance,
        CancellationToken ct)
    {
        _context.Attendances.Update(attendance);
        await _context.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Attendance attendance, CancellationToken ct)
    {
        _context.Attendances.Remove(attendance);
        await _context.SaveChangesAsync(ct);
    }
}
