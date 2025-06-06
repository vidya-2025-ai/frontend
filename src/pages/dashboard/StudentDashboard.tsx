
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import MobileMenuToggle from '@/components/layout/MobileMenuToggle';
import BackButton from '@/components/ui/back-button';
import StudentStats from '@/components/dashboard/StudentStats';
import ApplicationTracker from '@/components/dashboard/ApplicationTracker';
import RecommendedOpportunities from '@/components/dashboard/RecommendedOpportunities';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';

const StudentDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get user's full name for display
  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    return 'there';
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {!isMobileMenuOpen && (
        <MobileMenuToggle onClick={toggleMobileMenu} />
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <BackButton to="/" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome back, {getUserDisplayName()}!
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening with your applications and opportunities
            </p>
            
            <div className="mt-6">
              <StudentStats />
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ApplicationTracker />
              <RecommendedOpportunities />
            </div>
            
            <div className="mt-8">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
