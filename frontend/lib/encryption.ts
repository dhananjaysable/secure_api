import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-dev-key-do-not-use-in-prod';
const IV = process.env.NEXT_PUBLIC_ENCRYPTION_IV || 'default-dev-iv-12';

export class EncryptionService {
  private static key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  private static iv = CryptoJS.enc.Utf8.parse(IV);

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