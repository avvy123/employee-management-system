using EMS.API.DTOs;

namespace EMS.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);
        Task<bool> RegisterAsync(RegisterDto dto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
    }
}