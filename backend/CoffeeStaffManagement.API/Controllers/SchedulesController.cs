using CoffeeStaffManagement.Application.Schedules.Commands;
using CoffeeStaffManagement.Application.Schedules.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/schedules")]
public class SchedulesController : ControllerBase
{
    private readonly IMediator _mediator;

    public SchedulesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // ================= EMPLOYEE =================

    [HttpGet("my-requests/{employeeId:int}")]
    public async Task<IActionResult> GetMyRequests(int employeeId)
    {
        var result = await _mediator.Send(
            new GetMyShiftRequestsQuery(employeeId));
        return Ok(result);
    }

    [HttpPost("request")]
    public async Task<IActionResult> CreateRequest(
        [FromBody] CreateShiftRequestCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }

    // ================= ADMIN =================

    [HttpGet("requests")]
    public async Task<IActionResult> GetRequestsByDate(
        [FromQuery] DateOnly date)
    {
        var result = await _mediator.Send(
            new GetShiftRequestsByDateQuery(date));
        return Ok(result);
    }

    [HttpPost("approve")]
    public async Task<IActionResult> ApproveRequest(
        [FromBody] ApproveShiftRequestCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }

    // ================= OFFICIAL SCHEDULE =================

    [HttpGet]
    public async Task<IActionResult> GetSchedule(
        [FromQuery] DateOnly date)
    {
        var result = await _mediator.Send(
            new GetScheduleByDateQuery(date));
        return Ok(result);
    }
}
