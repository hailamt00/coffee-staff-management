using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/positions")]
public class PositionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PositionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _mediator.Send(new GetPositionsQuery()));

    [HttpPost]
    public async Task<IActionResult> Create(SavePositionRequest request)
        => Ok(await _mediator.Send(new CreatePositionCommand(request)));

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        SavePositionRequest request)
        => Ok(await _mediator.Send(
            new UpdatePositionCommand(id, request)));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mediator.Send(new DeletePositionCommand(id));
        return NoContent();
    }
}
