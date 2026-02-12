using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Npgsql;
using NpgsqlTypes;

namespace CoffeeStaffManagement.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;
        private readonly NpgsqlDataSource _dataSource;

        public EmployeeRepository(AppDbContext context, NpgsqlDataSource dataSource)
        {
            _context = context;
            _dataSource = dataSource;
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
            const string sql = @"
                INSERT INTO employees (
                    name, phone, cid, gender, 
                    service_salary, barista_salary, dob, hire_date, status
                ) VALUES (
                    @name, @phone, @cid, @gender, 
                    @service_salary, @barista_salary, @dob, @hire_date, @status
                ) RETURNING id, code, created_at";

            using var command = _dataSource.CreateCommand(sql);
            command.Parameters.AddWithValue("name", employee.Name);
            command.Parameters.AddWithValue("phone", employee.Phone);
            command.Parameters.AddWithValue("cid", (object?)employee.Cid ?? DBNull.Value);

            // Critical fix for Enum mapping
            command.Parameters.Add(new NpgsqlParameter("gender", NpgsqlDbType.Unknown)
            {
                Value = employee.Gender?.ToString() ?? (object)DBNull.Value
            });

            command.Parameters.AddWithValue("service_salary", (object?)employee.ServiceSalary ?? DBNull.Value);
            command.Parameters.AddWithValue("barista_salary", (object?)employee.BaristaSalary ?? DBNull.Value);
            command.Parameters.AddWithValue("dob", (object?)employee.Dob ?? DBNull.Value);
            command.Parameters.AddWithValue("hire_date", (object?)employee.HireDate ?? DBNull.Value);
            command.Parameters.AddWithValue("status", employee.Status);

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                employee.Id = reader.GetInt32(0);
                employee.Code = reader.GetString(1);
                employee.CreatedAt = reader.GetDateTime(2);
            }
        }

        public async Task UpdateAsync(Employee employee)
        {
            const string sql = @"
                UPDATE employees SET
                    name = @name,
                    phone = @phone,
                    cid = @cid,
                    gender = @gender,
                    service_salary = @service_salary,
                    barista_salary = @barista_salary,
                    dob = @dob,
                    hire_date = @hire_date,
                    status = @status
                WHERE id = @id";

            using var command = _dataSource.CreateCommand(sql);
            command.Parameters.AddWithValue("id", employee.Id);
            command.Parameters.AddWithValue("name", employee.Name);
            command.Parameters.AddWithValue("phone", employee.Phone);
            command.Parameters.AddWithValue("cid", (object?)employee.Cid ?? DBNull.Value);

            // Critical fix for Enum mapping
            command.Parameters.Add(new NpgsqlParameter("gender", NpgsqlDbType.Unknown)
            {
                Value = employee.Gender?.ToString() ?? (object)DBNull.Value
            });

            command.Parameters.AddWithValue("service_salary", (object?)employee.ServiceSalary ?? DBNull.Value);
            command.Parameters.AddWithValue("barista_salary", (object?)employee.BaristaSalary ?? DBNull.Value);
            command.Parameters.AddWithValue("dob", (object?)employee.Dob ?? DBNull.Value);
            command.Parameters.AddWithValue("hire_date", (object?)employee.HireDate ?? DBNull.Value);
            command.Parameters.AddWithValue("status", employee.Status);

            await command.ExecuteNonQueryAsync();
        }

        public async Task DeleteAsync(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}
