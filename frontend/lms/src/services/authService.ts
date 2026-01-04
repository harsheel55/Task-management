// services/authService.ts
import { api } from './api';
import type { AuthResponseDto, LoginDto, RegisterDto } from '@/types/auth.types';

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName
      }));
    }
    return response.data;
  },

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName
      }));
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
};
