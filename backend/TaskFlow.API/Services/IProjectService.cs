// Services/IProjectService.cs
using TaskFlow.API.Models.DTOs;

namespace TaskFlow.API.Services;

public interface IProjectService
{
    Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(string userId);
    Task<ProjectDto> GetProjectByIdAsync(Guid id);
    Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto, string userId);
    Task<ProjectDto> UpdateProjectAsync(Guid id, UpdateProjectDto dto);
    Task DeleteProjectAsync(Guid id);
    Task<ProjectMemberDto> InviteMemberAsync(Guid projectId, InviteMemberDto dto, string invitedById);
    Task RemoveMemberAsync(Guid projectId, string userId);
}
