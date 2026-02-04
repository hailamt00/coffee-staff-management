using CoffeeStaffManagement.Application.Employees.Commands;
using CoffeeStaffManagement.Application.Employees.DTOs;
using CoffeeStaffManagement.Application.Employees.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // ================= GET LIST (SEARCH) =================
    // GET: api/employees?search=abc
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search)
    {
        var result = await _mediator.Send(new GetEmployeesQuery(search));
        return Ok(result);
    }

    // ================= GET BY ID =================
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _mediator.Send(new GetEmployeeByIdQuery(id));
        if (result == null) return NotFound();
        return Ok(result);
    }

    // ================= CREATE =================
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        var id = await _mediator.Send(new CreateEmployeeCommand(
            dto.Name,
            dto.Phone,
            dto.Cid,
            dto.Gender,
            dto.SalaryService,
            dto.SalaryBar,
            dto.Dob,
            dto.HireDate
        ));

        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    // ================= UPDATE =================
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
    {
        await _mediator.Send(new UpdateEmployeeCommand(
            id,
            dto.Name,
            dto.Phone,
            dto.Cid,
            dto.Gender,
            dto.SalaryService,
            dto.SalaryBar,
            dto.Dob,
            dto.HireDate
        ));

        return NoContent();
    }

    // ================= DELETE =================
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mediator.Send(new DeleteEmployeeCommand(id));
        return NoContent();
    }
}
