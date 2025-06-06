
import api from './index';
import { User } from './types';

export const userService = {
  getUserProfile: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateUserProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  uploadProfilePhoto: async (file: File): Promise<{ avatar: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/users/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  searchUsers: async (params: { role?: string; skills?: string[]; name?: string }): Promise<User[]> => {
    const { role, skills, name } = params;
    const response = await api.get('/users/search', {
      params: {
        role,
        skills: skills ? skills.join(',') : undefined,
        name
      }
    });
    return response.data;
  }
};

export default userService;
