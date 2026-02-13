using CoffeeStaffManagement.Application.Schedules.Queries;
using CoffeeStaffManagement.Application.Schedules.DTOs;
using CoffeeStaffManagement.Application.Schedules.Commands;
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

    [HttpPut("request/{id:int}")]
    public async Task<IActionResult> UpdateRequest(int id,
        [FromBody] UpdateShiftRequestCommand command)
    {
        if (id != command.Id) return BadRequest("ID mismatch");
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("request/{id:int}")]
    public async Task<IActionResult> DeleteRequest(int id)
    {
        await _mediator.Send(new DeleteShiftRequestCommand(id));
        return NoContent();
    }

    // ================= ADMIN =================

    [HttpGet("requests")]
    public async Task<ActionResult<List<AdminShiftRequestDto>>> GetRequests(
        [FromQuery] DateOnly date)
    {
        return await _mediator.Send(new GetShiftRequestsByDateQuery(date));
    }

    [HttpGet("requests/weekly")]
    public async Task<ActionResult<List<AdminShiftRequestDto>>> GetWeeklyRequests(
        [FromQuery] DateOnly fromDate, [FromQuery] DateOnly toDate)
    {
        return await _mediator.Send(new GetShiftRequestsByDateRangeQuery(fromDate, toDate));
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

    [HttpGet("weekly")]
    public async Task<IActionResult> GetWeekly(
        [FromQuery] DateOnly fromDate,
        [FromQuery] DateOnly toDate)
    {
        var result = await _mediator.Send(
            new GetWeeklyScheduleQuery(fromDate, toDate));
        return Ok(result);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddSchedule(
        [FromBody] AddScheduleCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSchedule(int id,
        [FromBody] UpdateScheduleCommand command)
    {
        if (id != command.Id) return BadRequest("ID mismatch");
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSchedule(int id)
    {
        await _mediator.Send(new DeleteScheduleCommand(id));
        return NoContent();
    }
}
