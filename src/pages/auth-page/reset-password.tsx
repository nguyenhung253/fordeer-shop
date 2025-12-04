import Header from '@/components/header';
import { authService } from '@/services/authService';
import { CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Mã OTP phải có 6 chữ số');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authService.verifyOtp(email, otp);
      setIsOtpVerified(true);
    } catch (err: any) {
      setError(err.message || 'Mã OTP không chính xác');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email, otp, password);
      toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-75px)] bg-[#fcfcf6] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Đặt lại mật khẩu</h1>
            <p className="text-gray-600 mt-2 text-sm">
              {isOtpVerified
                ? 'Nhập mật khẩu mới cho tài khoản của bạn'
                : 'Nhập mã OTP đã được gửi đến email của bạn'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                required
                disabled={true}
              />
            </div>

            {/* OTP Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã OTP (6 số)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(val);
                    setError('');
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none transition-colors tracking-widest text-center text-lg ${
                    isOtpVerified
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b]'
                  }`}
                  placeholder="000000"
                  required
                  disabled={loading || isOtpVerified}
                />
                {!isOtpVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length !== 6}
                    className="px-4 py-2 bg-[#45690b] text-white rounded-lg font-medium hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xác nhận'}
                  </button>
                )}
                {isOtpVerified && (
                  <div className="flex items-center justify-center px-4 text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {/* Password Section - Only show after OTP verification */}
            {isOtpVerified && (
              <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors pr-10"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors pr-10"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-[#45690b] text-white rounded-lg font-medium hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Đặt lại mật khẩu'
                  )}
                </button>
              </form>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
