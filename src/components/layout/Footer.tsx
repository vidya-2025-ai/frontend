
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#007bff] to-[#00d4ff] flex items-center justify-center">
                <span className="text-white font-bold text-lg">VS</span>
              </span>
              <span className="ml-2 text-xl font-bold text-gray-800">Vidya-Samveda</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting students with social impact opportunities and mentorship.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">For Students</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Find Opportunities
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">For Organizations</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Post an Opportunity
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-[#007bff] transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Vidya-Samveda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
