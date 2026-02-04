namespace CoffeeStaffManagement.Application.Common.Interfaces;

using CoffeeStaffManagement.Domain.Entities;

public interface IAdminRepository
{
    Task<Admin?> GetByUsernameAsync(string username);
}
