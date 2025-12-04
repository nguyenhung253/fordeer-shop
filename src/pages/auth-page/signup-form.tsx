import { authService } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản dịch vụ');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Đang đăng ký tài khoản...');

    try {
      await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.dismiss(loadingToast);
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-[#45690b] font-bold text-[14px] mb-2">
          Họ và tên
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nhập họ và tên"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[#45690b] font-bold text-[14px] mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập địa chỉ email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[#45690b] font-bold text-[14px] mb-2">
          Số điện thoại
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-[#45690b] font-bold text-[14px] mb-2">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors pr-12 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
            minLength={8}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#45690b]"
          >
            {showPassword ? (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-[#45690b] font-bold text-[14px] mb-2">
          Xác nhận mật khẩu
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors pr-12 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#45690b]"
          >
            {showConfirmPassword ? (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-[#45690b] border-gray-300 rounded focus:ring-[#45690b] disabled:cursor-not-allowed"
            required
            disabled={loading}
          />
          <span className="text-[13px] text-gray-600">
            Tôi đồng ý với{" "}
            <a href="#" className="text-[#45690b] hover:underline">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#" className="text-[#45690b] hover:underline">
              Chính sách bảo mật
            </a>{" "}
            của FORDEER
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#45690b] text-white py-4 rounded-full font-bold text-[16px] hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>

      {/* Benefits */}
      <div className="bg-[#f8fdf0] rounded-lg p-4 mt-4">
        <p className="text-[13px] text-[#45690b] font-bold mb-2">
          Quyền lợi thành viên FORDEER:
        </p>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tích điểm đổi quà hấp dẫn</span>
          </li>
          <li className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Ưu đãi sinh nhật đặc biệt</span>
          </li>
          <li className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Nhận thông báo khuyến mãi sớm nhất</span>
          </li>
        </ul>
      </div>
    </form>
  );
}
