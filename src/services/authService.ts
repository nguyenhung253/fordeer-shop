import type {
  Customer,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Backend expects 'email' or 'phone' field
    const isEmail = credentials.email.includes("@");
    const payload = {
      ...(isEmail
        ? { email: credentials.email }
        : { phone: credentials.email }),
      password: credentials.password,
    };

    const response = await fetch(`${API_URL}/api/auth/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login error details:", data); // Log detailed error

      // Translate common error messages to Vietnamese
      let errorMessage = data.message || "Đăng nhập thất bại";

      if (errorMessage.toLowerCase().includes("invalid credentials")) {
        errorMessage = "Tài khoản hoặc mật khẩu không đúng";
      } else if (errorMessage.toLowerCase().includes("user not found")) {
        errorMessage = "Tài khoản không tồn tại";
      } else if (errorMessage.toLowerCase().includes("incorrect password")) {
        errorMessage = "Mật khẩu không đúng";
      } else if (errorMessage.toLowerCase().includes("account is disabled")) {
        errorMessage = "Tài khoản đã bị vô hiệu hóa";
      }

      throw new Error(errorMessage);
    }

    // Save tokens and user to localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.customer));

    // Sync cart after login (import dynamically to avoid circular dependency)
    import("./cartService").then(({ cartService }) => {
      cartService.onLogin();
    });

    return data;
  },

  /**
   * Register new customer
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/api/auth/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Register error details:", responseData);

      // Translate common error messages to Vietnamese
      let errorMessage = responseData.message || "Đăng ký thất bại";

      if (errorMessage.toLowerCase().includes("email already exists")) {
        errorMessage = "Email đã được sử dụng";
      } else if (
        errorMessage.toLowerCase().includes("phone number already exists")
      ) {
        errorMessage = "Số điện thoại đã được sử dụng";
      }

      throw new Error(errorMessage);
    }

    // Save tokens and user to localStorage (auto login after register)
    localStorage.setItem("accessToken", responseData.accessToken);
    localStorage.setItem("refreshToken", responseData.refreshToken);
    localStorage.setItem("user", JSON.stringify(responseData.customer));

    // Sync cart after register
    import("./cartService").then(({ cartService }) => {
      cartService.onLogin();
    });

    return responseData;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await fetch(`${API_URL}/api/auth/customer/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  /**
   * Get current logged in user
   */
  getCurrentUser: (): Customer | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },

  /**
   * Get access token
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  /**
   * Update current user in localStorage and trigger update event
   */
  updateCurrentUser: (user: Customer): void => {
    localStorage.setItem("user", JSON.stringify(user));
    // Dispatch custom event to notify components of user update
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: user }));
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await fetch(
      `${API_URL}/api/auth/customer/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Yêu cầu đặt lại mật khẩu thất bại");
    }
  },

  /**
   * Verify OTP
   */
  verifyOtp: async (email: string, otp: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/auth/customer/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Mã OTP không chính xác");
    }
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<void> => {
    const response = await fetch(
      `${API_URL}/api/auth/customer/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đặt lại mật khẩu thất bại");
    }
  },
};
