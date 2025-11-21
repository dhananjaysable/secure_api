using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecureApi.Models;
using SecureApi.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;

namespace SecureApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;
        private readonly IValidator<LoginRequest> _loginValidator;
        private readonly IValidator<RegisterRequest> _registerValidator;

        public AuthController(
            IAuthService authService, 
            EncryptionService encryptionService,
            IValidator<LoginRequest> loginValidator,
            IValidator<RegisterRequest> registerValidator)
            : base(encryptionService)
        {
            _authService = authService;
            _loginValidator = loginValidator;
            _registerValidator = registerValidator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EncryptedRequest request)
        {
            try
            {
                var loginRequest = DecryptRequest<LoginRequest>(request.Data);
                
                var validationResult = await _loginValidator.ValidateAsync(loginRequest);
                if (!validationResult.IsValid)
                    return EncryptedError(string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage)), 400);

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

                var validationResult = await _registerValidator.ValidateAsync(registerRequest);
                if (!validationResult.IsValid)
                    return EncryptedError(string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage)), 400);

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
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub); // Or "id" depending on how it was issued
            // Fallback to finding "id" claim if "sub" is not present or different
            if (userIdClaim == null) userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id");

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized();

            var user = await _authService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound();

            return EncryptedOk(new UserProfile
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            });
        }
    }
}
