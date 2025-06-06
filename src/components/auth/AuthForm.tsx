
import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthTabs from './AuthTabs';

// For backward compatibility with existing imports
export { LoginForm, RegisterForm, AuthTabs };

// Main component that combines all auth-related components
const AuthForm: React.FC<{ isLogin?: boolean }> = ({ isLogin = false }) => {
  return <AuthTabs isLogin={isLogin} />;
};

export default AuthForm;
