using Microsoft.EntityFrameworkCore;
using SecureApi.Models;

namespace SecureApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();

        public void SeedDemoData()
        {
            if (!Users.Any())
            {
                // Demo user - using BCrypt hashing
                var passwordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!");

                Users.Add(new User
                {
                    Email = "admin@example.com",
                    PasswordHash = passwordHash,
                    FirstName = "Admin",
                    LastName = "User",
                    Role = "Admin"
                });

                SaveChanges();
            }
        }
    }
}
