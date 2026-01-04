// Models/DTOs/ProjectDtos.cs
namespace TaskFlow.API.Models.DTOs;

public record ProjectDto(
    Guid Id,
    string Name,
    string? Description,
    UserDto CreatedBy,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<ProjectMemberDto> Members,
    List<ColumnDto> Columns
);

public record CreateProjectDto(
    string Name,
    string? Description
);

public record UpdateProjectDto(
    string? Name,
    string? Description
);

public record ProjectMemberDto(
    Guid Id,
    UserDto User,
    string Role,
    DateTime JoinedAt
);

public record InviteMemberDto(
    string Email,
    string Role
);
