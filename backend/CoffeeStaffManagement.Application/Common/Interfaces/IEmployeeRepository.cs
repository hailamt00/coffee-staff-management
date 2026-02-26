using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IEmployeeRepository : IGenericRepository<Employee>
{
    Task<List<Employee>> GetAllAsync(string? search);
    Task<Employee?> GetByIdAsync(int id);
    Task AddAsync(Employee employee);
    Task UpdateAsync(Employee employee);
    Task DeleteAsync(Employee employee);
}
