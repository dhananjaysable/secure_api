using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecureApi.Services;

namespace SecureApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService, EncryptionService encryptionService)
            : base(encryptionService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return EncryptedOk(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return EncryptedError("User not found", 404);

            return EncryptedOk(user);
        }
    }
}
