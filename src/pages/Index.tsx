
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import OpportunitiesPreview from '@/components/home/OpportunitiesPreview';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <div className="flex justify-center py-8 bg-gradient-to-r from-white via-blue-50 to-white">
          <div className="flex gap-6">
            <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
              Learn More About Us
            </Link>
            <Link to="/how-it-works" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
              See How It Works
            </Link>
          </div>
        </div>
        <OpportunitiesPreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
