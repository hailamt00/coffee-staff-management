using CoffeeStaffManagement.Application.Auth.Commands;
using CoffeeStaffManagement.Application.Auth.DTOs;
using CoffeeStaffManagement.Application.Employees.Commands;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _mediator.Send(new LoginCommand(request));
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    int id,
    [FromBody] UpdateEmployeeDto dto)
    {
        await _mediator.Send(
            new UpdateEmployeeCommand(id,
            dto.Name,
            dto.Phone,
            dto.Cid,
            dto.Gender,
            dto.SalaryService,
            dto.SalaryBar,
            dto.Dob,
            dto.HireDate
));

        return NoContent();
    }

}
