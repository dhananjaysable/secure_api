using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecureApi.Models;
using SecureApi.Services;

namespace SecureApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService, EncryptionService encryptionService)
            : base(encryptionService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EncryptedRequest request)
        {
            try
            {
                var loginRequest = DecryptRequest<LoginRequest>(request.Data);
                var authResponse = await _authService.LoginAsync(loginRequest);

                if (authResponse == null)
                    return EncryptedError("Invalid credentials", 401);

                return EncryptedOk(authResponse);
            }
            catch (Exception ex)
            {
                return EncryptedError("Invalid encrypted data");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EncryptedRequest request)
        {
            try
            {
                var registerRequest = DecryptRequest<RegisterRequest>(request.Data);
                var authResponse = await _authService.RegisterAsync(registerRequest);

                if (authResponse == null)
                    return EncryptedError("User already exists", 400);

                return EncryptedOk(authResponse);
            }
            catch (Exception ex)
            {
                return EncryptedError("Invalid encrypted data");
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] EncryptedRequest request)
        {
            try
            {
                var tokenRequest = DecryptRequest<RefreshTokenRequest>(request.Data);
                var authResponse = await _authService.RefreshTokenAsync(tokenRequest.Token, tokenRequest.RefreshToken);

                if (authResponse == null)
                    return EncryptedError("Invalid token", 400);

                return EncryptedOk(authResponse);
            }
            catch (Exception ex)
            {
                return EncryptedError("Invalid encrypted data");
            }
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var user = await _authService.GetUserByIdAsync(userId.Value);
            if (user == null)
                return NotFound();

            return Ok(new UserProfile
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            });
        }

        private int? GetUserIdFromToken()
        {
            var jwtService = HttpContext.RequestServices.GetService<JwtService>();
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(token))
                return null;

            return jwtService?.ValidateToken(token);
        }
    }
}
