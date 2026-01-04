// Services/ProjectService.cs
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.Models.DTOs;
using TaskFlow.API.Models.Entities;

namespace TaskFlow.API.Services;

public class ProjectService : IProjectService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProjectService(ApplicationDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(string userId)
    {
        var projects = await _context.Projects
            .Include(p => p.CreatedBy)
            .Include(p => p.Members).ThenInclude(m => m.User)
            .Include(p => p.Columns).ThenInclude(c => c.Tasks)
            .Where(p => p.Members.Any(m => m.UserId == userId))
            .OrderByDescending(p => p.UpdatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ProjectDto>>(projects);
    }

    public async Task<ProjectDto> GetProjectByIdAsync(Guid id)
    {
        var project = await _context.Projects
            .Include(p => p.CreatedBy)
            .Include(p => p.Members).ThenInclude(m => m.User)
            .Include(p => p.Columns).ThenInclude(c => c.Tasks)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            throw new KeyNotFoundException("Project not found");

        return _mapper.Map<ProjectDto>(project);
    }

    public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto, string userId)
    {
        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            CreatedById = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);

        // Add creator as owner
        var member = new ProjectMember
        {
            Id = Guid.NewGuid(),
            ProjectId = project.Id,
            UserId = userId,
            Role = ProjectRole.Owner,
            JoinedAt = DateTime.UtcNow
        };

        _context.ProjectMembers.Add(member);

        // Create default columns
        var defaultColumns = new[]
        {
            new Column { Id = Guid.NewGuid(), Name = "To Do", ProjectId = project.Id, Position = 0, CreatedAt = DateTime.UtcNow },
            new Column { Id = Guid.NewGuid(), Name = "In Progress", ProjectId = project.Id, Position = 1, CreatedAt = DateTime.UtcNow },
            new Column { Id = Guid.NewGuid(), Name = "Done", ProjectId = project.Id, Position = 2, CreatedAt = DateTime.UtcNow }
        };

        _context.Columns.AddRange(defaultColumns);
        await _context.SaveChangesAsync();

        return await GetProjectByIdAsync(project.Id);
    }

    public async Task<ProjectDto> UpdateProjectAsync(Guid id, UpdateProjectDto dto)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            throw new KeyNotFoundException("Project not found");

        if (dto.Name != null) project.Name = dto.Name;
        if (dto.Description != null) project.Description = dto.Description;

        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return await GetProjectByIdAsync(project.Id);
    }

    public async System.Threading.Tasks.Task DeleteProjectAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            throw new KeyNotFoundException("Project not found");

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
    }

    public async Task<ProjectMemberDto> InviteMemberAsync(Guid projectId, InviteMemberDto dto, string invitedById)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            throw new KeyNotFoundException("User not found");

        var existingMember = await _context.ProjectMembers
            .FirstOrDefaultAsync(m => m.ProjectId == projectId && m.UserId == user.Id);

        if (existingMember != null)
            throw new InvalidOperationException("User is already a member");

        var member = new ProjectMember
        {
            Id = Guid.NewGuid(),
            ProjectId = projectId,
            UserId = user.Id,
            Role = Enum.Parse<ProjectRole>(dto.Role),
            JoinedAt = DateTime.UtcNow
        };

        _context.ProjectMembers.Add(member);
        await _context.SaveChangesAsync();

        var createdMember = await _context.ProjectMembers
            .Include(m => m.User)
            .FirstAsync(m => m.Id == member.Id);

        return _mapper.Map<ProjectMemberDto>(createdMember);
    }

    public async System.Threading.Tasks.Task RemoveMemberAsync(Guid projectId, string userId)
    {
        var member = await _context.ProjectMembers
            .FirstOrDefaultAsync(m => m.ProjectId == projectId && m.UserId == userId);

        if (member == null)
            throw new KeyNotFoundException("Member not found");

        if (member.Role == ProjectRole.Owner)
            throw new InvalidOperationException("Cannot remove project owner");

        _context.ProjectMembers.Remove(member);
        await _context.SaveChangesAsync();
    }
}
