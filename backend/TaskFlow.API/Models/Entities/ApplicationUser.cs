// Models/Entities/ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace TaskFlow.API.Models.Entities;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    
    // Navigation properties
    public ICollection<ProjectMember> ProjectMemberships { get; set; } = new List<ProjectMember>();
    public ICollection<Task> AssignedTasks { get; set; } = new List<Task>();
    public ICollection<Task> CreatedTasks { get; set; } = new List<Task>();
    public ICollection<TaskComment> Comments { get; set; } = new List<TaskComment>();
}
