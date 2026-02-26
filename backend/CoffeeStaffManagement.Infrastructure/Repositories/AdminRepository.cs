using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class AdminRepository : GenericRepository<Admin>, IAdminRepository
{
    public AdminRepository(AppDbContext db) : base(db)
    {
    }

    public async Task<Admin?> GetByUsernameAsync(string username)
    {
        return await _context.Admins
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Username == username);
    }
}
