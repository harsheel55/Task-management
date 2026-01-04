// Models/Entities/Task.cs
namespace TaskFlow.API.Models.Entities;

public class Task
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Guid ColumnId { get; set; }
    public Column Column { get; set; } = null!;
    public string? AssignedToId { get; set; }
    public ApplicationUser? AssignedTo { get; set; }
    public string CreatedById { get; set; } = string.Empty;
    public ApplicationUser CreatedBy { get; set; } = null!;
    public Priority Priority { get; set; }
    public DateTime? DueDate { get; set; }
    public int Position { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<TaskComment> Comments { get; set; } = new List<TaskComment>();
    public ICollection<TaskAttachment> Attachments { get; set; } = new List<TaskAttachment>();
    public ICollection<TaskLabel> TaskLabels { get; set; } = new List<TaskLabel>();
}

public enum Priority
{
    Low,
    Medium,
    High,
    Urgent
}
