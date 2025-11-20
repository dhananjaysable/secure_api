using SecureApi.Data;
using SecureApi.Models;
using System;

namespace SecureApi.Services
{
    public interface IUserService
    {
        Task<List<UserProfile>> GetAllUsersAsync();
        Task<UserProfile?> GetUserByIdAsync(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserProfile>> GetAllUsersAsync()
        {
            return _context.Users.Select(u => new UserProfile
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName
            }).ToList();
        }

        public async Task<UserProfile?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserProfile
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }
    }
}
