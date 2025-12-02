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
  username?: string;
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
}

export interface UpdateProfileResponse {
  message: string;
  customer: Customer;
}
