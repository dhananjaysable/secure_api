using System.Diagnostics;

namespace SecureApi.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var request = context.Request;

            _logger.LogInformation("Incoming Request: {Method} {Path} from {IpAddress}", 
                request.Method, request.Path, context.Connection.RemoteIpAddress);

            await _next(context);

            stopwatch.Stop();
            var response = context.Response;

            _logger.LogInformation("Response: {StatusCode} for {Method} {Path} took {ElapsedMilliseconds}ms", 
                response.StatusCode, request.Method, request.Path, stopwatch.ElapsedMilliseconds);
        }
    }
}
