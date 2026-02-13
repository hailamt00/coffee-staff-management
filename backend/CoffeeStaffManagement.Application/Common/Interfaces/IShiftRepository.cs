using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IShiftRepository
{
    Task<Shift?> GetByIdAsync(int id);
    Task<List<Shift>> GetAllAsync();
}
