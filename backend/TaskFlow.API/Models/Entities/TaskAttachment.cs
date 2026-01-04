// Models/Entities/TaskAttachment.cs
namespace TaskFlow.API.Models.Entities;

public class TaskAttachment
{
    public Guid Id { get; set; }
    public Guid TaskId { get; set; }
    public Task Task { get; set; } = null!;
    public string FileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string ContentType { get; set; } = string.Empty;
    public string UploadedById { get; set; } = string.Empty;
    public ApplicationUser UploadedBy { get; set; } = null!;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}
