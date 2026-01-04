// Models/Entities/TaskComment.cs
namespace TaskFlow.API.Models.Entities;

public class TaskComment
{
    public Guid Id { get; set; }
    public Guid TaskId { get; set; }
    public Task Task { get; set; } = null!;
    public string Content { get; set; } = string.Empty;
    public string CreatedById { get; set; } = string.Empty;
    public ApplicationUser CreatedBy { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
