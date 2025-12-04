import Header from '@/components/header';
import { authService } from '@/services/authService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading('Đang gửi mã OTP...');

    try {
      await authService.forgotPassword(email);
      toast.dismiss(loadingToast);
      toast.success('Mã OTP đã được gửi đến email của bạn!');
      // Navigate to reset password page with email
      navigate('/reset-password', { state: { email } });
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
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
            <h1 className="text-2xl font-bold text-gray-800">Quên mật khẩu?</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="name@example.com"
                  required
                  disabled={loading}
                />
              </div>




              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#45690b] text-white rounded-lg font-medium hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Đang gửi...
                  </>
                ) : (
                  'Gửi liên kết'
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-[#45690b] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}
