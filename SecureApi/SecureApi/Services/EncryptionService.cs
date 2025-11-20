using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SecureApi.Services
{
    public class EncryptionService
    {
        private readonly byte[] _key;
        private readonly byte[] _iv;

        public EncryptionService(IConfiguration configuration)
        {
            var encryptionSettings = configuration.GetSection("Encryption");
            _key = Convert.FromBase64String(encryptionSettings["Key"]);
            _iv = Convert.FromBase64String(encryptionSettings["IV"]);
        }

        public string Encrypt(string plainText)
        {
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.IV = _iv;

            var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream();
            using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
            using (var sw = new StreamWriter(cs))
            {
                sw.Write(plainText);
            }

            return Convert.ToBase64String(ms.ToArray());
        }

        public string Decrypt(string cipherText)
        {
            var buffer = Convert.FromBase64String(cipherText);
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.IV = _iv;

            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream(buffer);
            using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
            using var sr = new StreamReader(cs);
            return sr.ReadToEnd();
        }

        public T DecryptRequest<T>(string encryptedData)
        {
            var decryptedJson = Decrypt(encryptedData);
            return JsonSerializer.Deserialize<T>(decryptedJson) ?? throw new ArgumentException("Invalid encrypted data");
        }

        public string EncryptResponse(object data)
        {
            var json = JsonSerializer.Serialize(data);
            return Encrypt(json);
        }
    }
}
