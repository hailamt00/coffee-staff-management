using CoffeeStaffManagement.Application.Dashboard.DTOs;
using CoffeeStaffManagement.Application.Dashboard.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly IMediator _mediator;

    public DashboardController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var result = await _mediator.Send(new GetDashboardStatsQuery());
        return Ok(result);
    }
}
