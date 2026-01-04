// Controllers/ColumnsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.Models.DTOs;
using TaskFlow.API.Models.Entities;
using AutoMapper;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ColumnsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ColumnsController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ColumnDto>> GetColumn(Guid id)
    {
        var column = await _context.Columns
            .Include(c => c.Tasks)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (column == null)
            return NotFound();

        return Ok(_mapper.Map<ColumnDto>(column));
    }

    [HttpPost]
    public async Task<ActionResult<ColumnDto>> CreateColumn(CreateColumnDto dto)
    {
        var column = _mapper.Map<Column>(dto);
        column.Id = Guid.NewGuid();
        column.CreatedAt = DateTime.UtcNow;

        _context.Columns.Add(column);
        await _context.SaveChangesAsync();

        var created = await _context.Columns
            .Include(c => c.Tasks)
            .FirstAsync(c => c.Id == column.Id);

        return CreatedAtAction(nameof(GetColumn), new { id = column.Id }, _mapper.Map<ColumnDto>(created));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ColumnDto>> UpdateColumn(Guid id, UpdateColumnDto dto)
    {
        var column = await _context.Columns.FindAsync(id);
        if (column == null)
            return NotFound();

        if (dto.Name != null) column.Name = dto.Name;
        if (dto.Position.HasValue) column.Position = dto.Position.Value;

        await _context.SaveChangesAsync();

        var updated = await _context.Columns
            .Include(c => c.Tasks)
            .FirstAsync(c => c.Id == id);

        return Ok(_mapper.Map<ColumnDto>(updated));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteColumn(Guid id)
    {
        var column = await _context.Columns.FindAsync(id);
        if (column == null)
            return NotFound();

        _context.Columns.Remove(column);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
