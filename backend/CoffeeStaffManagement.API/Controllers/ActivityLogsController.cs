using CoffeeStaffManagement.Application.ActivityLogs.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivityLogsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ActivityLogsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ActivityLogDto>>> GetAll()
    {
        var result = await _mediator.Send(new GetActivityLogsQuery());
        return Ok(result);
    }
}
