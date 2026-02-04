using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IAttendanceQrRepository
{
    Task<AttendanceQrLog?> GetTodayAsync(
        string phone,
        string role,
        DateOnly workDate,
        CancellationToken ct);

    Task AddAsync(
        AttendanceQrLog attendance,
        CancellationToken ct);

    Task UpdateAsync(
        AttendanceQrLog attendance,
        CancellationToken ct);

    Task<List<AttendanceQrLog>> GetTodayLogsAsync(
    int employeeId,
    string role,
    DateOnly workDate,
    CancellationToken ct);



}
