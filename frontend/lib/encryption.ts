import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'cXdlcnR5dWlvcGFzZGZnaGprbHp4Y3Zibm0xMjM0NTY=';
const ENCRYPTION_IV = process.env.NEXT_PUBLIC_ENCRYPTION_IV || 'YWJjZGVmZ2hpamtsbW5vcA==';

export class EncryptionService {
  private static key = CryptoJS.enc.Base64.parse(ENCRYPTION_KEY);
  private static iv = CryptoJS.enc.Base64.parse(ENCRYPTION_IV);

  static encrypt(data: any): string {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  static decrypt(encryptedData: string): any {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  }
}