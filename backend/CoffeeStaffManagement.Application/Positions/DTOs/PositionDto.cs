public class PositionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; }
    public List<ShiftDto> Shifts { get; set; } = [];
}
