import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthTokens, LoginCredentials, User } from '@/types/auth';

const API_URL = 'https://api.escuelajs.co/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/login', credentials);
    Cookies.set('accessToken', data.access_token);
    Cookies.set('refreshToken', data.refresh_token);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/profile');
    return data;
  },

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = Cookies.get('refreshToken');
    const { data } = await api.post<AuthTokens>('/refresh-token', { refreshToken });
    Cookies.set('accessToken', data.access_token);
    Cookies.set('refreshToken', data.refresh_token);
    return data;
  },

  logout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },

  isAuthenticated() {
    return !!Cookies.get('accessToken');
  }
};