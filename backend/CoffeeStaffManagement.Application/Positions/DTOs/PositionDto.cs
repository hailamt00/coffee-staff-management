using CoffeeStaffManagement.Application.Shifts.DTOs;

namespace CoffeeStaffManagement.Application.Positions.DTOs;

public class PositionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool Status { get; set; }
    public List<ShiftDto> Shifts { get; set; } = [];
}
