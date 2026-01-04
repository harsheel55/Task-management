// Services/ITaskService.cs
using TaskFlow.API.Models.DTOs;

namespace TaskFlow.API.Services;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetTasksByProjectAsync(Guid projectId);
    Task<TaskDto> GetTaskByIdAsync(Guid id);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, string userId);
    Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto dto);
    Task MoveTaskAsync(Guid id, Guid columnId, int position);
    Task DeleteTaskAsync(Guid id);
    Task<TaskCommentDto> AddCommentAsync(Guid taskId, CreateCommentDto dto, string userId);
}
