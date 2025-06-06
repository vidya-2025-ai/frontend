
import api from './index';
import { User, RegisterData } from './types';
import { toast } from '@/components/ui/use-toast';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      console.log('Logging in user:', email);
      
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      
      // Store token in local storage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored successfully');
        
        // Also store user data for quick access
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: RegisterData): Promise<LoginResponse> => {
    try {
      console.log('Registering user:', userData.email);
      
      const response = await api.post<LoginResponse>('/auth/register', userData);
      
      // Store token in local storage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored after registration');
        
        // Also store user data for quick access
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      // Call backend logout endpoint if needed
      await api.post<void>('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Ensure local storage is cleared even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('User logged out, token removed');
    }
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
  
  verifyToken: async (): Promise<{ valid: boolean; user?: User }> => {
    try {
      const response = await api.get<{ valid: boolean; user?: User }>('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  },
  
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },
  
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', { token, password });
    return response.data;
  },
  
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>(`/auth/verify-email/${token}`);
    return response.data;
  }
};

export default authService;
