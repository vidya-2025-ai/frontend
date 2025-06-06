
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenuToggle from './MobileMenuToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-white via-blue-50 to-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/*<span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#007bff] to-[#00d4ff] flex items-center justify-center">
                <span className="text-white font-bold text-lg"></span>
              </span>*/}
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">Optern</span>
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] px-3 py-2 text-sm font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] px-3 py-2 text-sm font-medium transition-colors duration-200">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] px-3 py-2 text-sm font-medium transition-colors duration-200">
              How It Works
            </Link>
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] px-3 py-2 text-sm font-medium transition-colors duration-200">
              Login
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-[#007bff] to-[#0069d9] hover:from-[#0069d9] hover:to-[#004d9e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenuToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-white to-blue-50">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#007bff] dark:hover:text-[#00d4ff] transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block w-full text-center bg-gradient-to-r from-[#007bff] to-[#0069d9] hover:from-[#0069d9] hover:to-[#004d9e] text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-300 mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
