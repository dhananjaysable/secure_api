using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecureApi.Services;

namespace SecureApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected readonly EncryptionService _encryptionService;

        public BaseApiController(EncryptionService encryptionService)
        {
            _encryptionService = encryptionService;
        }

        protected T DecryptRequest<T>(string encryptedData)
        {
            return _encryptionService.DecryptRequest<T>(encryptedData);
        }

        protected IActionResult EncryptedOk(object data)
        {
            var encryptedResponse = _encryptionService.EncryptResponse(data);
            return Ok(new { data = encryptedResponse });
        }

        protected IActionResult EncryptedError(string message, int statusCode = 400)
        {
            var errorResponse = new { error = message };
            var encryptedResponse = _encryptionService.EncryptResponse(errorResponse);
            return StatusCode(statusCode, new { data = encryptedResponse });
        }
    }
}
