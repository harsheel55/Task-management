// Models/Entities/Project.cs
namespace TaskFlow.API.Models.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string CreatedById { get; set; } = string.Empty;
    public ApplicationUser CreatedBy { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public ICollection<Column> Columns { get; set; } = new List<Column>();
    public ICollection<ProjectMember> Members { get; set; } = new List<ProjectMember>();
    public ICollection<Label> Labels { get; set; } = new List<Label>();
}

public class ProjectMember
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;
    public ProjectRole Role { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}

public enum ProjectRole
{
    Owner,
    Admin,
    Member,
    Viewer
}
