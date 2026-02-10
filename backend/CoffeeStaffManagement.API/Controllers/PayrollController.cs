using CoffeeStaffManagement.Application.Payroll.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/payrolls")]
[Authorize]
public class PayrollsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PayrollsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> Generate(
        [FromQuery] int employeeId,
        [FromQuery] int month,
        [FromQuery] int year)
    {
        await _mediator.Send(new GeneratePayrollCommand(employeeId, month, year));
        return Ok("Payroll generated successfully");
    }
}
