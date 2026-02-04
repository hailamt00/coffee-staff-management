using CoffeeStaffManagement.Application.Payrolls.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[Authorize]
[ApiController]
[Route("api/payroll-adjustments")]
public class PayrollAdjustmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PayrollAdjustmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreatePayrollAdjustmentCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }
}
