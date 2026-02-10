using CoffeeStaffManagement.Application.Transactions.Commands;
using CoffeeStaffManagement.Application.Transactions.DTOs;
using CoffeeStaffManagement.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TransactionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<TransactionDto>> Create(CreateTransactionRequest request)
    {
        var result = await _mediator.Send(new CreateTransactionCommand(request));
        return Ok(result);
    }
}
