```
    }

    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public UserProfile User { get; set; } = new UserProfile();
    }

    public class EncryptedResponse
    {
        public string Data { get; set; } = string.Empty;
    }
}
```