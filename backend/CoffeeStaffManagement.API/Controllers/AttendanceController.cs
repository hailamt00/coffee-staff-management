using CoffeeStaffManagement.API.Hubs;
using CoffeeStaffManagement.Application.Attendance.Commands;
using CoffeeStaffManagement.Application.Attendance.DTOs;
using CoffeeStaffManagement.Application.Attendance.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/attendance")]
public class AttendanceController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IHubContext<NotificationHub> _hub;

    public AttendanceController(IMediator mediator, IHubContext<NotificationHub> hub)
    {
        _mediator = mediator;
        _hub = hub;
    }

    [HttpGet]
    public async Task<IActionResult> GetByDate([FromQuery] DateOnly date)
    {
        var result = await _mediator.Send(new GetAttendanceByDateQuery(date));
        return Ok(result);
    }

    [HttpGet("range")]
    public async Task<IActionResult> GetByDateRange([FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
    {
        var result = await _mediator.Send(new GetAttendanceByDateRangeQuery(startDate, endDate));
        return Ok(result);
    }

    [HttpPost("check-in")]
    public async Task<IActionResult> CheckIn([FromBody] CheckInRequest request)
    {
        await _mediator.Send(new CheckInCommand(request));

        await _hub.Clients.Group("admins").SendAsync("ReceiveNotification", new StaffNotificationDto(
            Type: "info",
            Title: "Check-in",
            Message: $"Nhân viên #{request.EmployeeId} đã check-in lúc {DateTime.Now:HH:mm}",
            Timestamp: DateTime.Now
        ));

        return Ok();
    }

    [HttpPost("check-out")]
    public async Task<IActionResult> CheckOut([FromBody] CheckOutRequest request)
    {
        await _mediator.Send(new CheckOutCommand(request));

        await _hub.Clients.Group("admins").SendAsync("ReceiveNotification", new StaffNotificationDto(
            Type: "success",
            Title: "Check-out",
            Message: $"Nhân viên #{request.EmployeeId} đã check-out lúc {DateTime.Now:HH:mm}",
            Timestamp: DateTime.Now
        ));

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAttendanceCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAttendanceCommand command)
    {
        if (id != command.AttendanceId)
            return BadRequest("ID mismatch");

        await _mediator.Send(command);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mediator.Send(new DeleteAttendanceCommand(id));
        return Ok();
    }
}
