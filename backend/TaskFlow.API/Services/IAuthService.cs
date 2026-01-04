// Services/IAuthService.cs
using TaskFlow.API.Models.DTOs;

namespace TaskFlow.API.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
}
