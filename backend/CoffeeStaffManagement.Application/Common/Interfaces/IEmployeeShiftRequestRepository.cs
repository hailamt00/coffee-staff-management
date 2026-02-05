using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IEmployeeShiftRequestRepository
{
    Task<List<EmployeeShiftRequest>> GetByEmployeeAsync(long employeeId);
    Task<List<EmployeeShiftRequest>> GetByDateAsync(DateOnly date);
    Task<EmployeeShiftRequest?> GetByIdAsync(long id);
    Task AddAsync(EmployeeShiftRequest request);
    Task UpdateAsync(EmployeeShiftRequest request);
}
