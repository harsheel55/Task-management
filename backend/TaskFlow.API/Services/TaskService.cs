// Services/TaskService.cs
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.Models.DTOs;
using TaskFlow.API.Models.Entities;

namespace TaskFlow.API.Services;

public class TaskService : ITaskService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TaskService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TaskDto>> GetTasksByProjectAsync(Guid projectId)
    {
        var tasks = await _context.Tasks
            .Include(t => t.AssignedTo)
            .Include(t => t.CreatedBy)
            .Include(t => t.Comments).ThenInclude(c => c.CreatedBy)
            .Include(t => t.Attachments).ThenInclude(a => a.UploadedBy)
            .Include(t => t.TaskLabels).ThenInclude(tl => tl.Label)
            .Include(t => t.Column)
            .Where(t => t.Column.ProjectId == projectId)
            .OrderBy(t => t.Position)
            .ToListAsync();

        return _mapper.Map<IEnumerable<TaskDto>>(tasks);
    }

    public async Task<TaskDto> GetTaskByIdAsync(Guid id)
    {
        var task = await _context.Tasks
            .Include(t => t.AssignedTo)
            .Include(t => t.CreatedBy)
            .Include(t => t.Comments).ThenInclude(c => c.CreatedBy)
            .Include(t => t.Attachments).ThenInclude(a => a.UploadedBy)
            .Include(t => t.TaskLabels).ThenInclude(tl => tl.Label)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
            throw new KeyNotFoundException("Task not found");

        return _mapper.Map<TaskDto>(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, string userId)
    {
        var task = _mapper.Map<Models.Entities.Task>(dto);
        task.Id = Guid.NewGuid();
        task.CreatedById = userId;
        task.CreatedAt = DateTime.UtcNow;
        task.UpdatedAt = DateTime.UtcNow;

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return await GetTaskByIdAsync(task.Id);
    }

    public async Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            throw new KeyNotFoundException("Task not found");

        if (dto.Title != null) task.Title = dto.Title;
        if (dto.Description != null) task.Description = dto.Description;
        if (dto.AssignedToId != null) task.AssignedToId = dto.AssignedToId;
        if (dto.Priority.HasValue) task.Priority = dto.Priority.Value;
        if (dto.DueDate.HasValue) task.DueDate = dto.DueDate;

        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return await GetTaskByIdAsync(task.Id);
    }

    public async System.Threading.Tasks.Task MoveTaskAsync(Guid id, Guid columnId, int position)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            throw new KeyNotFoundException("Task not found");

        var oldColumnId = task.ColumnId;
        var oldPosition = task.Position;

        // Update positions in old column
        if (oldColumnId != columnId)
        {
            var tasksInOldColumn = await _context.Tasks
                .Where(t => t.ColumnId == oldColumnId && t.Position > oldPosition)
                .ToListAsync();

            foreach (var t in tasksInOldColumn)
            {
                t.Position--;
            }
        }

        // Update positions in new column
        var tasksInNewColumn = await _context.Tasks
            .Where(t => t.ColumnId == columnId && t.Position >= position)
            .ToListAsync();

        foreach (var t in tasksInNewColumn)
        {
            t.Position++;
        }

        task.ColumnId = columnId;
        task.Position = position;
        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    public async System.Threading.Tasks.Task DeleteTaskAsync(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            throw new KeyNotFoundException("Task not found");

        _context.Tasks.Remove(task);

        // Update positions of remaining tasks
        var tasksToUpdate = await _context.Tasks
            .Where(t => t.ColumnId == task.ColumnId && t.Position > task.Position)
            .ToListAsync();

        foreach (var t in tasksToUpdate)
        {
            t.Position--;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<TaskCommentDto> AddCommentAsync(Guid taskId, CreateCommentDto dto, string userId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null)
            throw new KeyNotFoundException("Task not found");

        var comment = new TaskComment
        {
            Id = Guid.NewGuid(),
            TaskId = taskId,
            Content = dto.Content,
            CreatedById = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.TaskComments.Add(comment);
        await _context.SaveChangesAsync();

        var createdComment = await _context.TaskComments
            .Include(c => c.CreatedBy)
            .FirstAsync(c => c.Id == comment.Id);

        return _mapper.Map<TaskCommentDto>(createdComment);
    }
}
