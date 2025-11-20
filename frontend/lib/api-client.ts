import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { EncryptionService } from './encryption';
import { User } from '../types/api';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7162/api';

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to encrypt data
    this.client.interceptors.request.use(
      (config) => {
        // Skip encryption for certain endpoints if needed
        if (config.data && !config.headers['X-No-Encrypt']) {
          config.data = { data: EncryptionService.encrypt(config.data) };
        }

        // Add auth token if available
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to decrypt data
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.data && !response.config.headers['X-No-Encrypt']) {
          response.data = EncryptionService.decrypt(response.data.data);
        }
        return response;
      },
      (error) => {
        if (error.response?.data?.data) {
          try {
            error.response.data = EncryptionService.decrypt(error.response.data.data);
          } catch {
            // If decryption fails, keep original error
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', credentials);
    const { token, user } = response.data;

    this.setToken(token);
    return { user, token };
  }

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    const response = await this.client.post('/auth/register', data);
    const { token, user } = response.data;

    this.setToken(token);
    return { user, token };
  }

  logout() {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // API methods
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();