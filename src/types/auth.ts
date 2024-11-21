export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}