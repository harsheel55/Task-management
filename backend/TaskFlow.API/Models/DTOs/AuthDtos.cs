// Models/DTOs/AuthDtos.cs
namespace TaskFlow.API.Models.DTOs;

public record RegisterDto(
    string Email,
    string Password,
    string FirstName,
    string LastName
);

public record LoginDto(
    string Email,
    string Password
);

public record AuthResponseDto(
    string Token,
    string Email,
    string FirstName,
    string LastName,
    DateTime ExpiresAt
);

public record UserDto(
    string Id,
    string Email,
    string FirstName,
    string LastName
);
