using CoffeeStaffManagement.Application.Auth.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Auth.Commands;

public record LoginCommand(LoginRequest Request)
    : IRequest<LoginResponse>;
