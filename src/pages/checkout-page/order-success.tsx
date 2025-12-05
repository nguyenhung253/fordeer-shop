import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, formData } = location.state || {};

  // Redirect if no order data
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formatPrice = (price: number | string) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-8 md:py-16 bg-[#fcfcf6]">
        <div className="max-w-[600px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-[#45690b] to-[#799a01] p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[#45690b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-[24px] md:text-[28px] font-bold text-white mb-2">
                Đặt hàng thành công!
              </h1>
              <p className="text-white/80 text-[14px]">
                Cảm ơn bạn đã đặt hàng tại FORDEER
              </p>
            </div>

            {/* Order Info */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Order Code */}
              <div className="text-center p-4 bg-[#f8fdf0] rounded-lg">
                <p className="text-[14px] text-gray-600 mb-1">Mã đơn hàng</p>
                <p className="text-[24px] font-bold text-[#45690b]">
                  {order.orderCode}
                </p>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1d4220] text-[16px]">
                  Thông tin đơn hàng
                </h3>

                <div className="space-y-2 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Người nhận:</span>
                    <span className="text-[#1d4220] font-medium">
                      {formData?.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="text-[#1d4220]">{formData?.phone}</span>
                  </div>
                  {formData?.address && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa chỉ:</span>
                      <span className="text-[#1d4220] text-right max-w-[200px]">
                        {[
                          formData.address,
                          formData.ward,
                          formData.district,
                          formData.city,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng thanh toán:</span>
                  <span className="text-[#45690b] font-bold text-[20px]">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <svg
                  className="w-6 h-6 text-yellow-600 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-yellow-800">
                    Đang chờ xác nhận
                  </p>
                  <p className="text-[13px] text-yellow-700">
                    Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm
                    nhất
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold text-[15px] hover:bg-[#42612e] transition-colors"
                >
                  Xem đơn hàng của tôi
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-[#d9ef7f] text-[#45690b] py-3 rounded-full font-bold text-[15px] hover:bg-[#c5e060] transition-colors"
                >
                  Tiếp tục mua sắm
                </button>
              </div>

              {/* Contact */}
              <div className="text-center text-[13px] text-gray-500">
                <p>
                  Cần hỗ trợ? Liên hệ hotline:{" "}
                  <span className="text-[#45690b] font-medium">1900 1234</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
