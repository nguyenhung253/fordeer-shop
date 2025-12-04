import { authService } from "./authService";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
  size?: string;
}

const CART_KEY = "fordeer_cart";
const API_URL = import.meta.env.VITE_API_URL;

export const cartService = {
  /**
   * Get all items in cart (from localStorage)
   */
  getCart: (): CartItem[] => {
    const cartStr = localStorage.getItem(CART_KEY);
    if (!cartStr) return [];
    try {
      return JSON.parse(cartStr);
    } catch {
      return [];
    }
  },

  /**
   * Save cart to localStorage
   */
  saveCart: (cart: CartItem[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    cartService.dispatchCartUpdate(cart);
  },

  /**
   * Add item to cart
   */
  addToCart: (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ): CartItem[] => {
    const cart = cartService.getCart();
    const existingIndex = cart.findIndex(
      (i) => i.productId === item.productId && i.size === item.size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }

    cartService.saveCart(cart);

    // Sync to server if logged in (fire and forget)
    if (authService.isAuthenticated()) {
      cartService.syncToServer(cart).catch(console.error);
    }

    return cart;
  },

  /**
   * Update item quantity
   */
  updateQuantity: (
    productId: number,
    quantity: number,
    size?: string
  ): CartItem[] => {
    const cart = cartService.getCart();
    const index = cart.findIndex(
      (i) => i.productId === productId && i.size === size
    );

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
    }

    cartService.saveCart(cart);

    // Sync to server if logged in
    if (authService.isAuthenticated()) {
      cartService.syncToServer(cart).catch(console.error);
    }

    return cart;
  },

  /**
   * Update item note
   */
  updateNote: (productId: number, note: string, size?: string): CartItem[] => {
    const cart = cartService.getCart();
    const index = cart.findIndex(
      (i) => i.productId === productId && i.size === size
    );

    if (index >= 0) {
      cart[index].note = note;
    }

    cartService.saveCart(cart);
    return cart;
  },

  /**
   * Remove item from cart
   */
  removeFromCart: (productId: number, size?: string): CartItem[] => {
    const cart = cartService.getCart();
    const filtered = cart.filter(
      (i) => !(i.productId === productId && i.size === size)
    );

    cartService.saveCart(filtered);

    // Sync to server if logged in
    if (authService.isAuthenticated()) {
      cartService.syncToServer(filtered).catch(console.error);
    }

    return filtered;
  },

  /**
   * Clear entire cart
   */
  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
    cartService.dispatchCartUpdate([]);

    // Clear on server if logged in
    if (authService.isAuthenticated()) {
      cartService.clearOnServer().catch(console.error);
    }
  },

  /**
   * Get cart total
   */
  getTotal: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * Get cart item count
   */
  getItemCount: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Dispatch cart update event
   */
  dispatchCartUpdate: (cart: CartItem[]): void => {
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
  },

  // ============ SERVER SYNC METHODS ============

  /**
   * Sync local cart to server
   */
  syncToServer: async (cart: CartItem[]): Promise<void> => {
    const token = authService.getAccessToken();
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/customer/cart/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
    } catch (error) {
      console.error("Failed to sync cart to server:", error);
    }
  },

  /**
   * Load cart from server and merge with local
   */
  loadFromServer: async (): Promise<CartItem[]> => {
    const token = authService.getAccessToken();
    if (!token) return cartService.getCart();

    try {
      const response = await fetch(`${API_URL}/api/customer/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return cartService.getCart();
      }

      const data = await response.json();
      const serverCart: CartItem[] = data.items || [];
      const localCart = cartService.getCart();

      // Merge strategy: combine local and server, prefer local quantities for conflicts
      const mergedCart = cartService.mergeCarts(localCart, serverCart);

      cartService.saveCart(mergedCart);

      // Sync merged cart back to server
      await cartService.syncToServer(mergedCart);

      return mergedCart;
    } catch (error) {
      console.error("Failed to load cart from server:", error);
      return cartService.getCart();
    }
  },

  /**
   * Merge two carts (local takes priority for conflicts)
   */
  mergeCarts: (localCart: CartItem[], serverCart: CartItem[]): CartItem[] => {
    const merged = [...localCart];

    for (const serverItem of serverCart) {
      const existingIndex = merged.findIndex(
        (i) =>
          i.productId === serverItem.productId && i.size === serverItem.size
      );

      if (existingIndex < 0) {
        // Item only exists on server, add it
        merged.push(serverItem);
      }
      // If exists locally, keep local version (already in merged)
    }

    return merged;
  },

  /**
   * Clear cart on server
   */
  clearOnServer: async (): Promise<void> => {
    const token = authService.getAccessToken();
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/customer/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to clear cart on server:", error);
    }
  },

  /**
   * Called when user logs in - sync carts
   */
  onLogin: async (): Promise<void> => {
    await cartService.loadFromServer();
  },

  /**
   * Called when user logs out - keep local cart
   */
  onLogout: (): void => {
    // Keep local cart as-is, just don't sync anymore
  },
};
