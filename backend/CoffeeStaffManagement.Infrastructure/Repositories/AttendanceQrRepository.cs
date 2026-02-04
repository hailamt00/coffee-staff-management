using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class AttendanceQrRepository : IAttendanceQrRepository
{
    private readonly AppDbContext _context;

    public AttendanceQrRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceQrLog?> GetTodayAsync(
        string phone,
        string role,
        DateOnly workDate,
        CancellationToken ct)
    {
        return await _context.AttendanceQrLogs
            .AsNoTracking()
            .FirstOrDefaultAsync(a =>
                a.Phone == phone &&
                a.Role == role &&
                a.WorkDate == workDate,
                ct);
    }

    public async Task AddAsync(
        AttendanceQrLog attendance,
        CancellationToken ct)
    {
        await _context.AttendanceQrLogs.AddAsync(attendance, ct);
        await _context.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(
        AttendanceQrLog attendance,
        CancellationToken ct)
    {
        _context.AttendanceQrLogs.Update(attendance);
        await _context.SaveChangesAsync(ct);
    }

    public async Task<List<AttendanceQrLog>> GetTodayLogsAsync(
    int employeeId,
    string role,
    DateOnly workDate,
    CancellationToken ct)
    {
        return await _context.AttendanceQrLogs
            .Where(x =>
                x.EmployeeId == employeeId &&
                x.Role == role &&
                x.WorkDate == workDate)
            .OrderBy(x => x.ActionTime)
            .ToListAsync(ct);
    }
}
