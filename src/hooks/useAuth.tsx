import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api/authService';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'recruiter' | 'admin';
  avatar?: string;
  bio?: string;
  skills?: string[];
  organization?: string;
  jobTitle?: string;
  preferences?: {
    emailNotifications?: boolean;
    applicationUpdates?: boolean;
    marketingEmails?: boolean;
    newOpportunities?: boolean;
    realTimeAlerts?: boolean;
    messageNotifications?: boolean;
    systemUpdates?: boolean;
    challengeSubmissions?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing user on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.log('Auth initialization - token exists:', !!token);
        console.log('Auth initialization - stored user exists:', !!storedUser);
        
        if (token && storedUser) {
          // First set user from localStorage for immediate UI update
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('User set from localStorage:', parsedUser);
          
          // Then verify token with backend
          const result = await authService.verifyToken();
          if (result.valid && result.user) {
            setUser(result.user);
            console.log('Token verified, user updated:', result.user);
          } else {
            console.log('Token verification failed, clearing auth data');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login for:', email);
      const response = await authService.login(email, password);
      
      if (response.user && response.token) {
        console.log('Login successful, setting user:', response.user);
        setUser(response.user);
        
        toast({
          title: "Login successful!",
          description: `Welcome back, ${response.user.firstName}!`,
        });

        // Navigate based on user role
        setTimeout(() => {
          if (response.user.role === 'student') {
            console.log('Navigating to student dashboard');
            navigate('/student/dashboard');
          } else if (response.user.role === 'recruiter') {
            console.log('Navigating to recruiter dashboard');
            navigate('/recruiter/dashboard');
          }
        }, 100);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting registration for:', userData.email);
      const response = await authService.register(userData);
      
      if (response.user && response.token) {
        console.log('Registration successful, setting user:', response.user);
        setUser(response.user);
        
        toast({
          title: "Registration successful!",
          description: `Welcome to Vidya-Samveda, ${response.user.firstName}!`,
        });

        // Navigate based on user role
        setTimeout(() => {
          if (response.user.role === 'student') {
            console.log('Navigating to student dashboard');
            navigate('/student/dashboard');
          } else if (response.user.role === 'recruiter') {
            console.log('Navigating to recruiter dashboard');
            navigate('/recruiter/dashboard');
          }
        }, 100);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      updateUser,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
