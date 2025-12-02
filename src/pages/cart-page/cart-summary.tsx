import { useState } from "react";

export default function CartSummary() {
  const [promoCode, setPromoCode] = useState("");

  // Mock data - in real app, this would come from cart state
  const subtotal = 2000;
  const shipping = 0;
  const discount = 0;
  const total = subtotal - discount + shipping;

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-[90px]">
      {/* Header */}
      <div className="bg-[#45690b] text-white p-4">
        <h3 className="text-[18px] font-bold">Tóm tắt đơn hàng</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Promo Code */}
        <div>
          <label className="block text-[#45690b] font-bold text-[14px] mb-2">
            Mã giảm giá
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] outline-none"
            />
            <button className="px-4 py-2 bg-[#d9ef7f] text-[#45690b] font-bold rounded-lg hover:bg-[#c5e060] transition-colors text-[14px]">
              Áp dụng
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">Tạm tính</span>
            <span className="text-[#1d4220]">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span className="text-[#1d4220]">
              {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-600">Giảm giá</span>
              <span className="text-red-500">-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-[#45690b] font-bold text-[16px]">
            Tổng cộng
          </span>
          <span className="text-[#45690b] font-bold text-[24px]">
            {formatPrice(total)}
          </span>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-[#45690b] text-white py-4 rounded-full font-bold text-[16px] hover:bg-[#42612e] transition-colors">
          Tiến hành thanh toán
        </button>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-[12px] text-gray-500 mb-3">
            Chấp nhận thanh toán qua
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              VISA
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              MC
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              Momo
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              COD
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#f8fdf0] p-4 border-t border-[#d9ef7f]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Miễn phí vận chuyển đơn từ 200.000đ</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Đổi trả trong 7 ngày</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tích điểm thành viên FORDEER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
