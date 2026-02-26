using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPositionRepository : IGenericRepository<Position>
{
    Task<List<Position>> GetAllAsync();
    new Task<Position?> GetByIdAsync(int id, CancellationToken ct = default);
}
