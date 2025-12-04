import type { UpdateProfileRequest, UpdateProfileResponse } from '@/types/auth';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

export const profileService = {
  /**
   * Update customer profile with optional avatar upload
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    const token = authService.getAccessToken();

    if (!token) {
      throw new Error('Không tìm thấy token xác thực');
    }

    // If updating avatar, use FormData
    if (data.avatar) {
      const formData = new FormData();
      if (data.username) {
        formData.append('fullName', data.username);
      }
      if (data.phone) formData.append('phone', data.phone);
      formData.append('avatar', data.avatar);

      const response = await fetch(`${API_URL}/api/auth/customer/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    }

    // If only updating text, use JSON
    const jsonData: { [key: string]: string | undefined } = {};
    if (data.username) {
      jsonData.fullName = data.username;
    }
    if (data.phone) {
      jsonData.phone = data.phone;
    }
    if (data.currentPassword) {
      jsonData.currentPassword = data.currentPassword;
    }
    if (data.newPassword) {
      jsonData.newPassword = data.newPassword;
    }

    const response = await fetch(`${API_URL}/api/auth/customer/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
    return handleResponse(response);
  },
};

async function handleResponse(response: Response): Promise<UpdateProfileResponse> {
  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Lỗi khi xử lý phản hồi từ server');
  }
  
  if (!response.ok) {
    // Translate common error messages to Vietnamese
    let errorMessage = data.message || 'Cập nhật hồ sơ thất bại';
    
    if (errorMessage.toLowerCase().includes('current password is incorrect')) {
      errorMessage = 'Mật khẩu hiện tại không đúng';
    } else if (errorMessage.toLowerCase().includes('current password required')) {
      errorMessage = 'Vui lòng nhập mật khẩu hiện tại';
    } else if (errorMessage.toLowerCase().includes('password')) {
      errorMessage = 'Lỗi liên quan đến mật khẩu: ' + data.message;
    } else if (response.status === 500) {
      errorMessage = 'Lỗi server. Vui lòng thử lại sau.';
    }
    
    throw new Error(errorMessage);
  }
  
  authService.updateCurrentUser(data.customer);
  return data;
}
