// Models/DTOs/TaskDtos.cs
using TaskFlow.API.Models.Entities;

namespace TaskFlow.API.Models.DTOs;

public record TaskDto(
    Guid Id,
    string Title,
    string? Description,
    Guid ColumnId,
    UserDto? AssignedTo,
    UserDto CreatedBy,
    string Priority,
    DateTime? DueDate,
    int Position,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<TaskCommentDto>? Comments,
    List<TaskAttachmentDto>? Attachments,
    List<LabelDto>? Labels
);

public record CreateTaskDto(
    string Title,
    string? Description,
    Guid ColumnId,
    string? AssignedToId,
    Priority Priority,
    DateTime? DueDate,
    int Position
);

public record UpdateTaskDto(
    string? Title,
    string? Description,
    string? AssignedToId,
    Priority? Priority,
    DateTime? DueDate
);

public record MoveTaskDto(
    Guid ColumnId,
    int Position
);

public record TaskCommentDto(
    Guid Id,
    string Content,
    UserDto CreatedBy,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

public record CreateCommentDto(
    string Content
);

public record TaskAttachmentDto(
    Guid Id,
    string FileName,
    string FileUrl,
    long FileSize,
    UserDto UploadedBy,
    DateTime UploadedAt
);

public record LabelDto(
    Guid Id,
    string Name,
    string Color
);

public record CreateLabelDto(
    string Name,
    string Color,
    Guid ProjectId
);
