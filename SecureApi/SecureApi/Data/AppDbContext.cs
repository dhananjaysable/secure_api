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
                // Demo user - in production, use proper password hashing
                using var sha256 = System.Security.Cryptography.SHA256.Create();
                var passwordHash = Convert.ToBase64String(
                    sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes("password123")));

                Users.Add(new User
                {
                    Email = "john.doe@example.com",
                    PasswordHash = passwordHash,
                    FirstName = "John",
                    LastName = "Doe"
                });

                Users.Add(new User
                {
                    Email = "jane.smith@example.com",
                    PasswordHash = passwordHash,
                    FirstName = "Jane",
                    LastName = "Smith"
                });

                SaveChanges();
            }
        }
    }
}
