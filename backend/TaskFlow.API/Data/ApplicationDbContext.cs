// Data/ApplicationDbContext.cs
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Models.Entities;

namespace TaskFlow.API.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectMember> ProjectMembers { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<Models.Entities.Task> Tasks { get; set; }
    public DbSet<TaskComment> TaskComments { get; set; }
    public DbSet<TaskAttachment> TaskAttachments { get; set; }
    public DbSet<Label> Labels { get; set; }
    public DbSet<TaskLabel> TaskLabels { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Project configuration
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);
            
            entity.HasOne(e => e.CreatedBy)
                .WithMany()
                .HasForeignKey(e => e.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ProjectMember configuration
        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.HasOne(e => e.Project)
                .WithMany(p => p.Members)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.User)
                .WithMany(u => u.ProjectMemberships)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasIndex(e => new { e.ProjectId, e.UserId }).IsUnique();
        });

        // Column configuration
        modelBuilder.Entity<Column>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            
            entity.HasOne(e => e.Project)
                .WithMany(p => p.Columns)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Task configuration
        modelBuilder.Entity<Models.Entities.Task>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(300);
            entity.Property(e => e.Description).HasMaxLength(2000);
            
            entity.HasOne(e => e.Column)
                .WithMany(c => c.Tasks)
                .HasForeignKey(e => e.ColumnId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.AssignedTo)
                .WithMany(u => u.AssignedTasks)
                .HasForeignKey(e => e.AssignedToId)
                .OnDelete(DeleteBehavior.SetNull);
                
            entity.HasOne(e => e.CreatedBy)
                .WithMany(u => u.CreatedTasks)
                .HasForeignKey(e => e.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // TaskComment configuration
        modelBuilder.Entity<TaskComment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).IsRequired().HasMaxLength(2000);
            
            entity.HasOne(e => e.Task)
                .WithMany(t => t.Comments)
                .HasForeignKey(e => e.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.CreatedBy)
                .WithMany(u => u.Comments)
                .HasForeignKey(e => e.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // TaskAttachment configuration
        modelBuilder.Entity<TaskAttachment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.FileUrl).IsRequired();
            
            entity.HasOne(e => e.Task)
                .WithMany(t => t.Attachments)
                .HasForeignKey(e => e.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.UploadedBy)
                .WithMany()
                .HasForeignKey(e => e.UploadedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Label configuration
        modelBuilder.Entity<Label>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Color).IsRequired().HasMaxLength(7);
            
            entity.HasOne(e => e.Project)
                .WithMany(p => p.Labels)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // TaskLabel configuration (Many-to-Many)
        modelBuilder.Entity<TaskLabel>(entity =>
        {
            entity.HasKey(e => new { e.TaskId, e.LabelId });
            
            entity.HasOne(e => e.Task)
                .WithMany(t => t.TaskLabels)
                .HasForeignKey(e => e.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.Label)
                .WithMany(l => l.TaskLabels)
                .HasForeignKey(e => e.LabelId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
