using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPositionRepository
{
    Task<List<Position>> GetAllAsync();
    Task<Position?> GetByIdAsync(int id);
    Task<bool> ExistsAsync(string name, int? excludeId = null);
    Task AddAsync(Position position);
    Task UpdateAsync(Position position);
    Task DeleteAsync(Position position);
}

