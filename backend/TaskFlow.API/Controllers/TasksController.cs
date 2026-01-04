// Controllers/TasksController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskFlow.API.Models.DTOs;
using TaskFlow.API.Services;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks([FromQuery] Guid projectId)
    {
        var tasks = await _taskService.GetTasksByProjectAsync(projectId);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(Guid id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var task = await _taskService.CreateTaskAsync(dto, userId!);
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDto>> UpdateTask(Guid id, UpdateTaskDto dto)
    {
        var task = await _taskService.UpdateTaskAsync(id, dto);
        return Ok(task);
    }

    [HttpPut("{id}/move")]
    public async Task<IActionResult> MoveTask(Guid id, MoveTaskDto dto)
    {
        await _taskService.MoveTaskAsync(id, dto.ColumnId, dto.Position);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
        await _taskService.DeleteTaskAsync(id);
        return NoContent();
    }
}
