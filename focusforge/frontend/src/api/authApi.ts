import apiClient from './apiClient';
import { AuthResponse, User } from '../types';

export const authApi = {
  login: async (usernameOrEmail: string, password: String): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', { usernameOrEmail, password });
    return res.data;
  },

  register: async (data: { username: string; email: string; password: String; fullName?: string; targetCompany?: string }): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register', data);
    return res.data;
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<User>('/auth/me');
    return res.data;
  },
};
