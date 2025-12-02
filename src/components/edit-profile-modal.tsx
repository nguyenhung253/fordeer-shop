import { profileService } from '@/services/profileService';
import type { Customer } from '@/types/auth';
import { getInitial } from '@/utils/user';
import { Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Customer;
  onSuccess: (updatedUser: Customer) => void;
}

export default function EditProfileModal({ isOpen, onClose, user, onSuccess }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    username: user.fullName || '', // Use fullName
    phone: user.phone || '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatarUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    setAvatarFile(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const updateData: any = {};

      if (formData.username !== user.fullName) {
        updateData.username = formData.username;
      }

      if (formData.phone !== user.phone) {
        updateData.phone = formData.phone;
      }

      if (avatarFile) {
        updateData.avatar = avatarFile;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length === 0) {
        setError('Không có thay đổi nào để cập nhật');
        setLoading(false);
        return;
      }

      const response = await profileService.updateProfile(updateData);
      onSuccess(response.customer);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Cập nhật hồ sơ thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa hồ sơ</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#45690b] flex items-center justify-center text-white text-3xl font-bold">
                  {getInitial(user)}
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#45690b] text-white p-2 rounded-full cursor-pointer hover:bg-[#42612e] transition-colors"
              >
                <Upload className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Click vào icon để tải ảnh lên<br />
              (Tối đa 5MB, định dạng: JPG, PNG, GIF)
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên hiển thị
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Nhập số điện thoại"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#45690b] focus:ring-1 focus:ring-[#45690b] outline-none transition-colors"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#45690b] text-white rounded-lg font-medium hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                'Lưu thay đổi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
