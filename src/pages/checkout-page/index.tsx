import Header from "@/components/header";
import Footer from "@/components/footer";
import { authService } from "@/services/authService";
import { cartService, type CartItem } from "@/services/cartService";
import { orderService } from "@/services/orderService";
import { vnpayService } from "@/services/vnpayService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type PaymentMethod = "cod" | "vnpay" | "bank";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  });

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      navigate("/login");
      return;
    }

    // Load cart items
    const items = cartService.getCart();
    if (items.length === 0) {
      toast.error("Giỏ hàng trống");
      navigate("/cart");
      return;
    }
    setCartItems(items);

    // Pre-fill user info
    const user = authService.getCurrentUser();
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
      }));
    }
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 200000 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    setLoading(true);
    try {
      // Create order first
      const order = await orderService.createOrder(cartItems, 0);

      // Handle VNPay payment
      if (paymentMethod === "vnpay") {
        const vnpayResponse = await vnpayService.createPayment({
          orderId: order.id,
          amount: total,
          orderInfo: `Thanh toan don hang ${order.orderCode}`,
        });
        // Redirect to VNPay payment page
        window.location.href = vnpayResponse.paymentUrl;
        return;
      }

      // For COD and other methods, clear cart and show success
      cartService.clearCart();
      toast.success(`Đặt hàng thành công! Mã đơn: ${order.orderCode}`);
      navigate("/order-success", { state: { order, formData } });
    } catch (error: any) {
      toast.error(error.message || "Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Title Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[300px] bg-[#45690b]" />
            <h2 className="text-[20px] md:text-[26px] font-bold text-[#45690b] whitespace-nowrap">
              THANH TOÁN
            </h2>
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[300px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-4 md:py-8 bg-[#fcfcf6]">
        <div className="max-w-[1152px] mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Shipping Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-[18px] font-bold text-[#45690b] mb-4 flex items-center gap-2">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Thông tin giao hàng
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="0912345678"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="Số nhà, tên đường"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Phường/Xã
                      </label>
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="Phường/Xã"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Quận/Huyện
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="Quận/Huyện"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Tỉnh/Thành phố
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none"
                        placeholder="Tỉnh/Thành phố"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#45690b] outline-none resize-none"
                        placeholder="Ghi chú cho đơn hàng (ví dụ: giao hàng giờ hành chính)"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-[18px] font-bold text-[#45690b] mb-4 flex items-center gap-2">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Phương thức thanh toán
                  </h3>

                  <div className="space-y-3">
                    {/* COD */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-[#45690b] bg-[#f8fdf0]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-5 h-5 text-[#45690b]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1d4220]">
                          Thanh toán khi nhận hàng (COD)
                        </p>
                        <p className="text-[13px] text-gray-500">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#d9ef7f] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#45690b]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </label>

                    {/* VNPay */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "vnpay"
                          ? "border-[#45690b] bg-[#f8fdf0]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="vnpay"
                        checked={paymentMethod === "vnpay"}
                        onChange={() => setPaymentMethod("vnpay")}
                        className="w-5 h-5 text-[#45690b]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1d4220]">VNPay</p>
                        <p className="text-[13px] text-gray-500">
                          Thanh toán qua cổng VNPay (ATM, Visa, MasterCard, QR)
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#0066b3] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">
                          VNPay
                        </span>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "bank"
                          ? "border-[#45690b] bg-[#f8fdf0]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="w-5 h-5 text-[#45690b]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1d4220]">
                          Chuyển khoản ngân hàng
                        </p>
                        <p className="text-[13px] text-gray-500">
                          Chuyển khoản qua tài khoản ngân hàng
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-[90px]">
                  {/* Header */}
                  <div className="bg-[#45690b] text-white p-4">
                    <h3 className="text-[18px] font-bold">Đơn hàng của bạn</h3>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 max-h-[300px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-16 h-16 bg-[#f8fdf0] rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-medium text-[#1d4220] truncate">
                            {item.name}
                          </h4>
                          {item.size && (
                            <p className="text-[12px] text-gray-500">
                              Size: {item.size}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[12px] text-gray-500">
                              x{item.quantity}
                            </span>
                            <span className="text-[14px] font-medium text-[#45690b]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="p-4 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="text-[#1d4220]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="text-[#1d4220]">
                        {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#45690b] font-bold text-[16px]">
                        Tổng cộng
                      </span>
                      <span className="text-[#45690b] font-bold text-[24px]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="p-4 pt-0">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#45690b] text-white py-4 rounded-full font-bold text-[16px] hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Đang xử lý...
                        </span>
                      ) : (
                        "Đặt hàng"
                      )}
                    </button>
                  </div>

                  {/* Back to cart */}
                  <div className="p-4 pt-0 text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/cart")}
                      className="text-[14px] text-[#799a01] hover:text-[#45690b] transition-colors"
                    >
                      ← Quay lại giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
