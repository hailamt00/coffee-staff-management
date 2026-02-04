using CoffeeStaffManagement.Application.Attendance.Commands;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/attendance/qr")]
public class AttendanceQrController : ControllerBase
{
    private readonly IMediator _mediator;

    public AttendanceQrController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("check-in")]
    public async Task<IActionResult> CheckIn(
        AttendanceQrCommand cmd)
    {
        await _mediator.Send(cmd with
        {
            Action = AttendanceQrAction.CheckIn
        });

        return Ok();
    }

    [HttpPost("check-out")]
    public async Task<IActionResult> CheckOut(
        AttendanceQrCommand cmd)
    {
        await _mediator.Send(cmd with
        {
            Action = AttendanceQrAction.CheckOut
        });

        return Ok();
    }
}
