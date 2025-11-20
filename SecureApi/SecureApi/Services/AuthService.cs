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
            // In real application, use proper password hashing
            var user = _context.Users.FirstOrDefault(u =>
                u.Email == request.Email && u.PasswordHash == HashPassword(request.Password));

            if (user == null)
                return null;

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
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
            // For demo purposes only - use proper hashing like BCrypt in production
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
