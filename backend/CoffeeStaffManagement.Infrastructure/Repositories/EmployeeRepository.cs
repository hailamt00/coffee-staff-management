using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;

namespace CoffeeStaffManagement.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllAsync(string? search)
        {
            IQueryable<Employee> query = _context.Employees;

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(e =>
                    e.Name.Contains(search) ||
                    e.Phone.Contains(search) ||
                    e.Code.Contains(search));
            }

            return await query
                .OrderBy(e => e.Code)
                .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}
