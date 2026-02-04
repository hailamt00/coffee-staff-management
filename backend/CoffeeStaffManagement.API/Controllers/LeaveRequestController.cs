using CoffeeStaffManagement.Application.LeaveRequests.Commands;
using CoffeeStaffManagement.Application.LeaveRequests.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.Api.Controllers;

[ApiController]
[Route("api/leave-requests")]
public class LeaveRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public LeaveRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateLeaveRequestCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _mediator.Send(
            new GetAllLeaveRequestsQuery()));
    }

    [HttpPut("{id}/approve")]
    public async Task<IActionResult> Approve(
        int id,
        [FromQuery] bool approved)
    {
        await _mediator.Send(
            new ApproveLeaveRequestCommand(id, approved));
        return Ok();
    }
}
