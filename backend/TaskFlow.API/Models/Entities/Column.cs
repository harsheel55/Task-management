// Models/Entities/Column.cs
namespace TaskFlow.API.Models.Entities;

public class Column
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public int Position { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
}
