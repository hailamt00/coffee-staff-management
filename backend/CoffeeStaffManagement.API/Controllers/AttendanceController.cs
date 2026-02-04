using CoffeeStaffManagement.Application.Attendance.Commands;
using CoffeeStaffManagement.Application.Attendance.DTOs;
using CoffeeStaffManagement.Application.Attendance.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/attendance")]
[Authorize]
public class AttendanceController : ControllerBase
{
    private readonly IMediator _mediator;

    public AttendanceController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetByDate([FromQuery] DateOnly date)
    {
        var result = await _mediator.Send(
            new GetAttendanceByDateQuery(date));

        return Ok(result);
    }

    [HttpPost("check-in")]
    public async Task<IActionResult> CheckIn(
        [FromBody] CheckInRequest request)
    {
        await _mediator.Send(new CheckInCommand(request));
        return Ok();
    }

    [HttpPost("check-out")]
    public async Task<IActionResult> CheckOut(
        [FromBody] CheckOutRequest request)
    {
        await _mediator.Send(new CheckOutCommand(request));
        return Ok();
    }
}
