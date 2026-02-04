using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStaffManagement.API.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult Public()
    {
        return Ok("Anyone can access");
    }

    [HttpGet("auth")]
    [Authorize]
    public IActionResult Authenticated()
    {
        return Ok("Authenticated user");
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminOnly()
    {
        return Ok("Hello Admin 👑");
    }
}
