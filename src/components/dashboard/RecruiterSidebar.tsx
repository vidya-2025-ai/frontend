
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Search,
  BarChart3,
  Heart,
  MessageSquare,
  Shield,
  Settings,
  Building,
  PlusCircle,
  X,
  LogOut,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface RecruiterSidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({ 
  isMobileMenuOpen = false, 
  setIsMobileMenuOpen 
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
    
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  useEffect(() => {
    if (isMobile) {
      setIsOpen(!!isMobileMenuOpen);
    } else {
      setIsOpen(true);
    }
  }, [isMobile, isMobileMenuOpen]);
  
  const closeMobileMenu = () => {
    if (isMobile && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Posted Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { name: 'Post New Job', href: '/recruiter/post-internship', icon: PlusCircle },
    { name: 'All Applications', href: '/recruiter/applications', icon: FileText },
    { name: 'Candidates', href: '/recruiter/candidates', icon: Users },
    { name: 'Schedule', href: '/recruiter/schedule', icon: Calendar },
    { name: 'Talent Search & ATS', href: '/recruiter/talent-search', icon: Search },
    { name: 'Assessment Stats', href: '/recruiter/assessment-stats', icon: BarChart3 },
    { name: 'Mentorship Program', href: '/recruiter/mentorship', icon: Heart },
    { name: 'Corporate Challenges', href: '/recruiter/challenges', icon: Building },
    { name: 'Grievance Portal', href: '/recruiter/grievances', icon: Shield },
    { name: 'Community Hub', href: '/recruiter/community', icon: MessageSquare },
    { name: 'Settings', href: '/recruiter/settings', icon: Settings },
  ];  

  if (!isOpen) return null;

  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-white dark:bg-gray-900 dark:border-gray-800",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-64" : "hidden md:flex w-64"
    )}>
      {isMobile && (
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">VidyaSamveda</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Recruiter Portal</p>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors',
                location.pathname === item.href 
                  ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
              onClick={closeMobileMenu}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.firstName && user?.lastName 
                ? `${user.firstName[0]}${user.lastName[0]}` 
                : 'U'}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Recruiter</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        <button 
          onClick={logout}
          className="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
