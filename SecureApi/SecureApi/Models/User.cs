    }

    public class UserProfile
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }

    public class EncryptedRequest
    {
        public string Data { get; set; } = string.Empty;
    }

    public class EncryptedResponse
    {
        public string Data { get; set; } = string.Empty;
    }
}