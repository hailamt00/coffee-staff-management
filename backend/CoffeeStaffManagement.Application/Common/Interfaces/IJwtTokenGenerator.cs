using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(Admin admin);
}
