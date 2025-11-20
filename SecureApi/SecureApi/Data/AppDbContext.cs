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
                var passwordHash = BCrypt.Net.BCrypt.HashPassword("password123");

                Users.Add(new User
                {
                    Email = "john.doe@example.com",
                    PasswordHash = passwordHash,
                    FirstName = "John",
                    LastName = "Doe",
                    Role = "Admin"
                });

                Users.Add(new User
                {
                    Email = "jane.smith@example.com",
                    PasswordHash = passwordHash,
                    FirstName = "Jane",
                    LastName = "Smith",
                    Role = "User"
                });

                SaveChanges();
            }
        }
    }
}
