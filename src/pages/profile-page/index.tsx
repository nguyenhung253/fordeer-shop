import ChangePasswordModal from '@/components/change-password-modal';
import EditProfileModal from '@/components/edit-profile-modal';
import Header from '@/components/header';
import { authService } from '@/services/authService';
import type { Customer } from '@/types/auth';
import { getDisplayName, getInitial } from '@/utils/user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleProfileUpdate = (updatedUser: Customer) => {
    setUser(updatedUser);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#fcfcf6] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#45690b] mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#fcfcf6] py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#45690b]">Hồ sơ cá nhân</h1>
            <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center space-y-4">
                  {/* Avatar */}
                  <div className="relative">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={getDisplayName(user)}
                        className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-[#45690b] flex items-center justify-center text-white text-3xl font-bold">
                        {getInitial(user)}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{getDisplayName(user)}</h3>
                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  </div>

                  {/* Badge */}
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Khách hàng
                  </span>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Thông tin chi tiết</h3>

                <div className="space-y-4">
                  {/* Username */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Tên hiển thị</p>
                      <p className="text-base text-gray-800 mt-1">{getDisplayName(user) || <span className="text-gray-400 italic">Chưa cập nhật</span>}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-base text-gray-800 mt-1">{user.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  {user.phone && (
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                        <p className="text-base text-gray-800 mt-1">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Account Type */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Loại tài khoản</p>
                      <p className="text-base text-gray-800 mt-1 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex-1 bg-[#45690b] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#42612e] transition-colors"
                  >
                    Chỉnh sửa hồ sơ
                  </button>
                  <button
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    className="flex-1 bg-white text-[#45690b] py-2 px-4 rounded-lg font-medium border border-[#45690b] hover:bg-gray-50 transition-colors"
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {user && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSuccess={handleProfileUpdate}
        />
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSuccess={() => {
          toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
          setIsChangePasswordModalOpen(false);
        }}
      />
    </>
  );
}
