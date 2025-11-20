using System.Security.Cryptography;
using SecureApi.Data;
using SecureApi.Models;
using System;
using System.Text;

namespace SecureApi.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginAsync(LoginRequest request);
        Task<AuthResponse?> RegisterAsync(RegisterRequest request);
        Task<AuthResponse?> RefreshTokenAsync(string token, string refreshToken);
        Task<User?> GetUserByIdAsync(int id);
    }

    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthService(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            // Find user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

            // Verify password
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return null;

            var token = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Token = token,
                RefreshToken = refreshToken,
                User = new UserProfile
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
                return null;

            var user = new User
            {
                Email = request.Email,
                PasswordHash = HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Role = "User" // Default role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Token = token,
                RefreshToken = refreshToken,
                User = new UserProfile
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public async Task<AuthResponse?> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = _jwtService.GetPrincipalFromExpiredToken(token);
            if (principal == null) return null;

            var userIdClaim = principal.Claims.FirstOrDefault(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId)) return null;

            var user = await _context.Users.FindAsync(userId);
            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return null;

            var newToken = _jwtService.GenerateToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Token = newToken,
                RefreshToken = newRefreshToken,
                User = new UserProfile
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
