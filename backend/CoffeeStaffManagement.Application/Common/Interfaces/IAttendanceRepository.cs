using AttendanceEntity = CoffeeStaffManagement.Domain.Entities.Attendance;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IAttendanceRepository
{
    Task<AttendanceEntity?> GetAsync(
        int employeeId,
        int shiftId,
        DateOnly workDate);

    Task<List<AttendanceEntity>> GetByDateAsync(DateOnly workDate);
    Task<List<AttendanceEntity>> GetByDateRangeAsync(
    int employeeId,
    DateOnly fromDate,
    DateOnly toDate);
    Task AddAsync(AttendanceEntity attendance, CancellationToken cancellationToken);
    Task UpdateAsync(AttendanceEntity attendance, CancellationToken cancellationToken);
}
