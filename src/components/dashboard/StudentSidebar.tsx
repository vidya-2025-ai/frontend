
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Home, 
  Search, 
  Settings, 
  BookOpen,
  GraduationCap,
  Users,
  MessageSquare,
  ListCheck,
  Award,
  Heart,
  ShieldCheck,
  FileText as Resume,
  Calculator,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface StudentSidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  isMobileMenuOpen,
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
  
  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/student/dashboard' },
    { label: 'Explore', icon: Search, href: '/student/explore' },
    { label: 'Applications & Activity', icon: FileText, href: '/student/applications' },
    { label: 'Career & Skills', icon: GraduationCap, href: '/student/careerskills' },
    { label: 'Certificates', icon: Award, href: '/student/certificates' },
    { label: 'Mentorship', icon: Users, href: '/student/mentorship' },
    { label: 'Calendar', icon: Calendar, href: '/student/calendar' },
    { label: 'Resume Builder', icon: Resume, href: '/student/resume-builder' },
    { label: 'ATS Calculator', icon: Calculator, href: '/student/ats-calculator' },
    { label: 'Micro-Internships', icon: BookOpen, href: '/student/micro-internships' },
    { label: 'Community Hub', icon: Heart, href: '/student/community' },
    { label: 'Challenges', icon: ListCheck, href: '/student/challenges' },
    { label: 'Grievances', icon: ShieldCheck, href: '/student/grievances' },
    { label: 'Settings', icon: Settings, href: '/student/settings' },
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Optern</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Student Portal</p>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
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
              <span className="truncate">{item.label}</span>
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
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

export default StudentSidebar;
