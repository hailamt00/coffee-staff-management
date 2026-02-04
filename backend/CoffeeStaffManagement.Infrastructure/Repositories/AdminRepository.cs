using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Repositories;

public class AdminRepository : IAdminRepository
{
    private readonly AppDbContext _db;

    public AdminRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Admin?> GetByUsernameAsync(string username)
    {
        return await _db.Admins
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Username == username);
    }
}
