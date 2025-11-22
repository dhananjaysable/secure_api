import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-dev-key-do-not-use-in-prod';
const IV = process.env.NEXT_PUBLIC_ENCRYPTION_IV || 'default-dev-iv-12';

export class EncryptionService {
  // Convert Base64 string to WordArray (CryptoJS format)
  private static key = CryptoJS.enc.Base64.parse(ENCRYPTION_KEY);
  private static iv = CryptoJS.enc.Base64.parse(IV);

  static encrypt(data: any): string {
    const jsonString = JSON.stringify(data);

    // Encrypt using AES with CBC mode and PKCS7 padding (same as .NET)
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Return as Base64 string (CryptoJS does this automatically with toString())
    return encrypted.toString();
  }

  static decrypt(encryptedData: string): any {
    try {
      // Decrypt the Base64 string
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      // Convert decrypted WordArray to UTF-8 string
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

      if (!jsonString) {
        throw new Error('Decryption resulted in empty string');
      }

      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }
}