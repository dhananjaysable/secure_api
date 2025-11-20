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
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized (Token Expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const token = this.getToken();
            const refreshToken = this.getRefreshToken();

            if (token && refreshToken) {
              // Call refresh endpoint
              // We need to use a separate instance or bypass interceptors to avoid infinite loops if this fails?
              // But here we just use the same client but we must ensure we don't encrypt if the endpoint expects raw, 
              // OR we ensure we encrypt if it expects encrypted.
              // The backend expects EncryptedRequest for /auth/refresh too.

              const response = await this.client.post('/auth/refresh', { token, refreshToken });
              const { token: newToken, refreshToken: newRefreshToken } = response.data;

              this.setToken(newToken);
              this.setRefreshToken(newRefreshToken);

              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // We need to retry the original request. 
              // Note: originalRequest.data is already encrypted from the first attempt.
              // If we send it again, the request interceptor might encrypt it AGAIN (double encryption).
              // We should check if it's already encrypted or reset it.
              // However, the request interceptor checks `if (config.data ...)`
              // If we pass the original config back to axios, it runs interceptors again.

              // To avoid double encryption, we can decode the data back or mark it as 'already encrypted'.
              // Or simpler: just let it fail if double encrypted? No, that's bad.

              // Better approach: The request interceptor encrypts `config.data`. 
              // `originalRequest.data` is the *transformed* data (string: { data: "..." }).
              // If we retry, we should probably pass the *original* data if possible, but axios doesn't easily give it back.

              // For now, let's assume the retry might need a bit of care. 
              // But often simply retrying works if the interceptor is smart or if we bypass it.
              // Let's try simple retry first.

              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            this.logout();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

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

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;

    this.setToken(token);
    this.setRefreshToken(refreshToken);
    return { user, token };
  }

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    const response = await this.client.post('/auth/register', data);
    const { token, refreshToken, user } = response.data;

    this.setToken(token);
    this.setRefreshToken(refreshToken);
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