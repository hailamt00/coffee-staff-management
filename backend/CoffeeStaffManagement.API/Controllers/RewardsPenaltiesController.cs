using CoffeeStaffManagement.Application.RewardsPenalties.Commands;
using CoffeeStaffManagement.Application.RewardsPenalties.Queries;
using CoffeeStaffManagement.Application.RewardsPenalties.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RewardsPenaltiesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RewardsPenaltiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<RewardPenaltyDto>>> GetAll(
        [FromQuery] int month,
        [FromQuery] int year)
    {
        return Ok(await _mediator.Send(new GetRewardsPenaltiesQuery(month, year)));
    }

    [HttpGet("types")]
    public async Task<ActionResult<List<RewardPenaltyTypeDto>>> GetTypes()
    {
        return Ok(await _mediator.Send(new GetRewardPenaltyTypesQuery()));
    }

    [HttpPost("types")]
    public async Task<ActionResult<int>> CreateType(CreateRewardPenaltyTypeRequest request)
    {
        return Ok(await _mediator.Send(new CreateRewardPenaltyTypeCommand(request)));
    }

    [HttpPut("types/{id}")]
    public async Task<ActionResult> UpdateType(int id, CreateRewardPenaltyTypeRequest request)
    {
        await _mediator.Send(new UpdateRewardPenaltyTypeCommand(id, request));
        return NoContent();
    }

    [HttpDelete("types/{id}")]
    public async Task<ActionResult> DeleteType(int id)
    {
        await _mediator.Send(new DeleteRewardPenaltyTypeCommand(id));
        return NoContent();
    }

    [HttpPost("apply")]
    public async Task<ActionResult<int>> Apply(ApplyRewardPenaltyRequest request)
    {
        return Ok(await _mediator.Send(new ApplyRewardPenaltyCommand(request)));
    }

    [HttpGet("employee/{employeeId}")]
    public async Task<ActionResult<List<RewardPenaltyDto>>> GetEmployeeRewardsPenalties(
        int employeeId,
        [FromQuery] int month,
        [FromQuery] int year)
    {
        return Ok(await _mediator.Send(new GetEmployeeRewardsPenaltiesQuery(employeeId, month, year)));
    }
}
