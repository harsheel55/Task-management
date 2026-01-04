// Models/DTOs/ColumnDtos.cs
namespace TaskFlow.API.Models.DTOs;

public record ColumnDto(
    Guid Id,
    string Name,
    Guid ProjectId,
    int Position,
    List<TaskDto> Tasks
);

public record CreateColumnDto(
    string Name,
    Guid ProjectId,
    int Position
);

public record UpdateColumnDto(
    string? Name,
    int? Position
);
