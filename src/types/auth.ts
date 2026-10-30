export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  message: string;
  redirectTo?: string;
}
