import { authService } from "./authService";
import type { CartItem } from "./cartService";

const API_URL = import.meta.env.VITE_API_URL;

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  discount?: number;
}

export interface Order {
  id: number;
  orderCode: string;
  customerId: number;
  totalAmount: string;
  discount: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  items: {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: string;
    product?: {
      productName: string;
      imageUrl: string;
    };
  }[];
}

export const orderService = {
  /**
   * Create order from cart items
   */
  createOrder: async (cartItems: CartItem[], discount = 0): Promise<Order> => {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập để đặt hàng");
    }

    const items: OrderItem[] = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_URL}/api/customer/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, discount }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đặt hàng thất bại");
    }

    return data.order;
  },

  /**
   * Get customer's orders
   */
  getOrders: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{ orders: Order[]; pagination: any }> => {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập");
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append("status", status);

    const response = await fetch(
      `${API_URL}/api/customer/orders?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải đơn hàng");
    }

    return data;
  },

  /**
   * Get order by ID
   */
  getOrderById: async (orderId: number): Promise<Order> => {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập");
    }

    const response = await fetch(`${API_URL}/api/customer/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải đơn hàng");
    }

    return data.order;
  },
};
