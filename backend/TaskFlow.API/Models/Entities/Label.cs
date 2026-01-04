// Models/Entities/Label.cs
namespace TaskFlow.API.Models.Entities;

public class Label
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#000000";
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    
    // Navigation properties
    public ICollection<TaskLabel> TaskLabels { get; set; } = new List<TaskLabel>();
}

public class TaskLabel
{
    public Guid TaskId { get; set; }
    public Task Task { get; set; } = null!;
    public Guid LabelId { get; set; }
    public Label Label { get; set; } = null!;
}
