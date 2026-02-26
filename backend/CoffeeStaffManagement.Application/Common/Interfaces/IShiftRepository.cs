using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IShiftRepository : IGenericRepository<Shift>
{
    new Task<Shift?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<List<Shift>> GetAllAsync();
}
