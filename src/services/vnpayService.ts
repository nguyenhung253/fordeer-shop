import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreatePaymentRequest {
  orderId: number;
  amount: number;
  orderInfo?: string;
  bankCode?: string;
}

export interface CreatePaymentResponse {
  message: string;
  paymentUrl: string;
  txnRef: string;
}

export const vnpayService = {
  /**
   * Create VNPay payment URL
   */
  createPayment: async (
    data: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> => {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập để thanh toán");
    }

    const response = await fetch(`${API_URL}/api/vnpay/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Không thể tạo thanh toán VNPay");
    }

    return result;
  },
};
