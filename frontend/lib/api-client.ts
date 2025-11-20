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