
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 py-16 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl drop-shadow-md">
            Ready to make an impact?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-white mx-auto font-medium">
            Join Optern today and start your journey towards meaningful opportunities and experiences.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 font-medium shadow-md">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
