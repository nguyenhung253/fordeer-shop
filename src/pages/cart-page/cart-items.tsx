import { cartService, type CartItem } from "@/services/cartService";
import { useEffect, useState } from "react";

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    setCartItems(cartService.getCart());

    // Listen for cart updates
    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setCartItems(e.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate as EventListener
      );
    };
  }, []);

  const updateQuantity = (productId: number, delta: number, size?: string) => {
    const item = cartItems.find(
      (i) => i.productId === productId && i.size === size
    );
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      cartService.updateQuantity(productId, newQuantity, size);
    }
  };

  const removeItem = (productId: number, size?: string) => {
    cartService.removeFromCart(productId, size);
  };

  const updateNote = (productId: number, note: string, size?: string) => {
    cartService.updateNote(productId, note, size);
    setCartItems(cartService.getCart());
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-[#45690b] mb-4">
          <svg
            className="w-20 h-20 mx-auto opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-[20px] font-bold text-[#45690b] mb-2">
          Giỏ hàng trống
        </h3>
        <p className="text-[#45690b] mb-6">
          Hãy thêm sản phẩm vào giỏ hàng của bạn
        </p>
        <a
          href="/"
          className="inline-block bg-[#45690b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
        >
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#45690b] text-white rounded-t-lg p-4 grid grid-cols-12 gap-4 font-bold text-[14px]">
        <div className="col-span-5">Sản phẩm</div>
        <div className="col-span-2 text-center">Đơn giá</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Thành tiền</div>
        <div className="col-span-1"></div>
      </div>

      {/* Items */}
      {cartItems.map((item, index) => (
        <div
          key={`${item.productId}-${item.size || ""}-${index}`}
          className="bg-white rounded-lg p-4 grid grid-cols-12 gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Product Info */}
          <div className="col-span-5 flex items-center gap-4">
            <div className="w-[80px] h-[80px] bg-[#d9ef7f] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#45690b] text-[14px]">
                {item.name}
              </h4>
              {item.size && (
                <p className="text-[12px] text-gray-500">Size: {item.size}</p>
              )}
              <input
                type="text"
                placeholder="Ghi chú..."
                value={item.note || ""}
                onChange={(e) =>
                  updateNote(item.productId, e.target.value, item.size)
                }
                className="mt-2 text-[12px] text-gray-500 border-b border-gray-200 focus:border-[#45690b] outline-none w-full"
              />
            </div>
          </div>

          {/* Unit Price */}
          <div className="col-span-2 text-center text-[#1d4220] text-[14px]">
            {formatPrice(item.price)}
          </div>

          {/* Quantity */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="flex items-center border border-[#45690b] rounded-full">
              <button
                onClick={() => updateQuantity(item.productId, -1, item.size)}
                className="w-8 h-8 flex items-center justify-center text-[#45690b] hover:bg-[#d9ef7f] rounded-l-full transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center text-[#45690b] font-bold">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, 1, item.size)}
                className="w-8 h-8 flex items-center justify-center text-[#45690b] hover:bg-[#d9ef7f] rounded-r-full transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="col-span-2 text-center text-[#45690b] font-bold text-[14px]">
            {formatPrice(item.price * item.quantity)}
          </div>

          {/* Remove */}
          <div className="col-span-1 text-center">
            <button
              onClick={() => removeItem(item.productId, item.size)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Continue Shopping */}
      <div className="pt-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#45690b] hover:underline"
        >
          <span>←</span>
          <span>Tiếp tục mua sắm</span>
        </a>
      </div>
    </div>
  );
}
