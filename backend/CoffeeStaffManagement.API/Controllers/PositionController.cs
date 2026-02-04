using CoffeeStaffManagement.Application.Positions.Commands;
using CoffeeStaffManagement.Application.Positions.DTOs;
using CoffeeStaffManagement.Application.Positions.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/positions")]
public class PositionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PositionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /* ================= QUERY ================= */

    // GET: api/positions
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _mediator.Send(new GetPositionsQuery()));

    // GET: api/positions/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _mediator.Send(
            new GetPositionByIdQuery(id));

        return result is null ? NotFound() : Ok(result);
    }

    /* ================= COMMAND ================= */

    // POST: api/positions
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreatePositionRequest request)
    {
        var id = await _mediator.Send(
            new CreatePositionCommand(request));

        return CreatedAtAction(
            nameof(GetById),
            new { id },
            id
        );
    }

    // PUT: api/positions/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdatePositionRequest request)
    {
        await _mediator.Send(
            new UpdatePositionCommand(
                id,
                request.Name
            )
        );

        return NoContent();
    }

    // DELETE: api/positions/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mediator.Send(
            new DeletePositionCommand(id));

        return NoContent();
    }
}
