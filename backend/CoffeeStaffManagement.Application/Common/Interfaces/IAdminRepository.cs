namespace CoffeeStaffManagement.Application.Common.Interfaces;

using CoffeeStaffManagement.Domain.Entities;

public interface IAdminRepository : IGenericRepository<Admin>
{
    Task<Admin?> GetByUsernameAsync(string username);
}
