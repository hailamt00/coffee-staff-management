using CoffeeStaffManagement.Application.Revenues.Commands;
using CoffeeStaffManagement.Application.Revenues.DTOs;
using CoffeeStaffManagement.Application.Revenues.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RevenuesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RevenuesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<RevenueDto>> Create(CreateRevenueRequest request)
    {
        var result = await _mediator.Send(new CreateRevenueCommand(request));
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<RevenueDto>>> GetByMonth([FromQuery] int? month, [FromQuery] int? year, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        if (from.HasValue && to.HasValue)
        {
            var rangeResult = await _mediator.Send(new GetRevenuesByRangeQuery(from.Value, to.Value));
            return Ok(rangeResult);
        }

        if (month.HasValue && year.HasValue)
        {
            var monthResult = await _mediator.Send(new GetRevenuesByMonthQuery(month.Value, year.Value));
            return Ok(monthResult);
        }

        return BadRequest("Please provide either month/year or from/to date range.");
    }

    [HttpGet("schedule/{scheduleId}")]
    public async Task<ActionResult<RevenueDto>> GetBySchedule(int scheduleId)
    {
        var result = await _mediator.Send(new GetRevenueByScheduleQuery(scheduleId));
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpGet("date/{date}")]
    public async Task<ActionResult<List<RevenueDto>>> GetByDate(DateTime date)
    {
        var result = await _mediator.Send(new GetRevenuesByDateQuery(date));
        return Ok(result);
    }
}
