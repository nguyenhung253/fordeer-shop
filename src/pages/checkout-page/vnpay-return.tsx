import Header from "@/components/header";
import Footer from "@/components/footer";
import { cartService } from "@/services/cartService";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VNPayReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const responseCode = searchParams.get("vnp_ResponseCode");
  const txnRef = searchParams.get("vnp_TxnRef");
  const amount = searchParams.get("vnp_Amount");
  const orderId = txnRef?.split("_")[0];

  useEffect(() => {
    if (responseCode === "00") {
      // Payment successful
      setStatus("success");
      setMessage("Thanh toán thành công!");
      cartService.clearCart();
    } else {
      // Payment failed
      setStatus("failed");
      setMessage(getErrorMessage(responseCode || ""));
    }
  }, [responseCode]);

  const getErrorMessage = (code: string): string => {
    const errorMessages: Record<string, string> = {
      "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
      "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
      "10": "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
      "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
      "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
      "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).",
      "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
      "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
      "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
      "75": "Ngân hàng thanh toán đang bảo trì.",
      "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.",
      "99": "Các lỗi khác",
    };
    return errorMessages[code] || "Giao dịch không thành công";
  };

  const formatPrice = (amountStr: string | null) => {
    if (!amountStr) return "0đ";
    const num = parseInt(amountStr) / 100; // VNPay returns amount * 100
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-8 md:py-16 bg-[#fcfcf6]">
        <div className="max-w-[500px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {status === "loading" ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#45690b] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Đang xử lý kết quả thanh toán...
                </p>
              </div>
            ) : status === "success" ? (
              <>
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
                  <h1 className="text-[24px] font-bold text-white mb-2">
                    Thanh toán thành công!
                  </h1>
                  <p className="text-white/80 text-[14px]">
                    Cảm ơn bạn đã mua hàng tại FORDEER
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="text-center p-4 bg-[#f8fdf0] rounded-lg">
                    <p className="text-[14px] text-gray-600 mb-1">
                      Mã giao dịch
                    </p>
                    <p className="text-[18px] font-bold text-[#45690b]">
                      {txnRef}
                    </p>
                  </div>

                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-medium text-[#1d4220]">
                      #{orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-bold text-[#45690b]">
                      {formatPrice(amount)}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
                    >
                      Xem đơn hàng
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full bg-[#d9ef7f] text-[#45690b] py-3 rounded-full font-bold hover:bg-[#c5e060] transition-colors"
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Failed Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h1 className="text-[24px] font-bold text-white mb-2">
                    Thanh toán thất bại
                  </h1>
                  <p className="text-white/80 text-[14px]">{message}</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <svg
                      className="w-6 h-6 text-red-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-[13px] text-red-700">
                      Mã lỗi: {responseCode}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
