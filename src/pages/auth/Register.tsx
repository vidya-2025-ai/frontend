
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthTabs } from '@/components/auth/AuthForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:text-white">
              Create Your Account
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Join Vidya-Samveda to discover opportunities and grow your network
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mt-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-95">
            <AuthTabs />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
