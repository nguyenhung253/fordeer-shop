export interface Customer {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: 'customer';
  createdAt?: string;
  updatedAt?: string;
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
