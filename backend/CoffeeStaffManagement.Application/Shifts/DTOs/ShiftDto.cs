public class ShiftDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string StartTime { get; set; } = null!;
    public string EndTime { get; set; } = null!;
    public bool IsEnabled { get; set; }
}
