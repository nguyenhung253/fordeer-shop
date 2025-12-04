export interface Customer {
  id: number;
  customerCode: string;
  fullName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  birthYear?: number | null;
  avatarUrl?: string;
  // Optional fields for compatibility or future use
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  customer: Customer;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: Customer | null;
  isAuthenticated: boolean;
}

export interface UpdateProfileRequest {
  username?: string;
  phone?: string;
  avatar?: File;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateProfileResponse {
  message: string;
  customer: Customer;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  customer: Customer;
  accessToken: string;
  refreshToken: string;
}
