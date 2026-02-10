using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IPositionRepository
{
    Task<List<Position>> GetAllAsync();
    Task<Position?> GetByIdAsync(int id);
    Task AddAsync(Position position);
    Task UpdateAsync(Position position);
    Task DeleteAsync(Position position);
}
