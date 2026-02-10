using CoffeeStaffManagement.Application.Auth.DTOs;
using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.Auth.Commands;

public class LoginCommandHandler
    : IRequestHandler<LoginCommand, LoginResponse>
{
    private readonly IAdminRepository _adminRepo;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenGenerator _jwt;

    public LoginCommandHandler(
        IAdminRepository adminRepo,
        IPasswordHasher hasher,
        IJwtTokenGenerator jwt)
    {
        _adminRepo = adminRepo;
        _hasher = hasher;
        _jwt = jwt;
    }

    public async Task<LoginResponse> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Get username from LoginRequest
        var admin = await _adminRepo.GetByUsernameAsync(
            request.Request.Username
        );

        if (admin is null)
            throw new UnauthorizedAccessException("Invalid credentials");

        // 2. Verify password
        var isPasswordValid = _hasher.Verify(
            request.Request.Password,
            admin.PasswordHash
        );

        if (!isPasswordValid)
            throw new UnauthorizedAccessException("Invalid credentials");

        // 3. Generate JWT
        var token = _jwt.GenerateToken(admin);

        // 4. Response
        return new LoginResponse
        {
            Token = token,
            Username = admin.Username,
        };
    }
}
