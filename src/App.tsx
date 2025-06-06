import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';

// Public Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import HowItWorks from '@/pages/HowItWorks';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

// Student Pages
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import ExploreOpportunities from '@/pages/student/ExploreOpportunities';
import ViewOpportunity from '@/pages/student/OpportunityDetails';
import Application from '@/pages/student/Applications';
import ApplicationsTracker from '@/pages/student/ApplicationsTracker';
import ResumeBuilder from '@/pages/student/ResumeBuilder';
import SkillAssessment from '@/pages/student/SkillAssessment';
import SkillAssessmentTake from '@/pages/student/SkillAssessmentTake';
import ATSCalculator from '@/pages/student/ATSCalculator';
import Certificates from '@/pages/student/Certificates';
import CommunityHub from '@/pages/student/CommunityHub';
import Mentorship from '@/pages/student/Mentorship';
import InternshipChallenges from '@/pages/student/InternshipChallenges';
import MicroInternships from '@/pages/student/MicroInternships';
import GrievanceSystem from '@/pages/student/GrievanceSystem';
import Calendar from '@/pages/student/Calendar';
import Settings from '@/pages/student/Settings';
import Projects from '@/pages/student/Projects';
import ProjectDetails from '@/pages/student/ProjectDetails';
import CareerMap from '@/pages/student/CareerMap';
import CareerSkills from '@/pages/student/CareerSkills';
import CourseView from '@/pages/student/CourseView';
import StudentSchedule from './pages/student/Schedule';

// Recruiter Pages
import Dashboard from '@/pages/recruiter/Dashboard';
import PostInternship from '@/pages/recruiter/PostInternship';
import Applications from '@/pages/recruiter/Applications';
import ApplicationsView from '@/pages/recruiter/ApplicationsView';
import Jobs from '@/pages/recruiter/Jobs';
import Candidates from '@/pages/recruiter/Candidates';
import TalentSearch from '@/pages/recruiter/TalentSearch';
import AssessmentStats from '@/pages/recruiter/AssessmentStats';
import OpportunitiesManagement from '@/pages/recruiter/OpportunitiesManagement';
import Schedule from '@/pages/recruiter/Schedule';
import Challenges from '@/pages/recruiter/Challenges';
import Community from '@/pages/recruiter/Community';
import MentorshipManage from '@/pages/recruiter/MentorshipManage';
import GrievancePortal from '@/pages/recruiter/GrievancePortal';
import RecSettings from '@/pages/recruiter/RecSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/explore" element={<ExploreOpportunities />} />
              <Route path="/student/opportunity/:id" element={<ViewOpportunity />} />
              <Route path="/student/applications" element={<Application />} />
              <Route path="/student/applicationstracker" element={<ApplicationsTracker />} />
              <Route path="/student/resume-builder" element={<ResumeBuilder />} />
              <Route path="/student/skill-assessment" element={<SkillAssessment />} />
              <Route path="/student/skill-assessment/:id" element={<SkillAssessmentTake />} />
              <Route path="/student/ats-calculator" element={<ATSCalculator />} />
              <Route path="/student/certificates" element={<Certificates />} />
              <Route path="/student/community" element={<CommunityHub />} />
              <Route path="/student/mentorship" element={<Mentorship />} />
              <Route path="/student/challenges" element={<InternshipChallenges />} />
              <Route path="/student/micro-internships" element={<MicroInternships />} />
              <Route path="/student/grievances" element={<GrievanceSystem />} />
              <Route path="/student/calendar" element={<Calendar />} />
              <Route path="/student/settings" element={<Settings />} />
              <Route path="/student/projects" element={<Projects />} />
              <Route path="/student/project/:id" element={<ProjectDetails />} />
              <Route path="/student/careermap" element={<CareerMap />} />
              <Route path="/student/careerskills" element={<CareerSkills />} />
              <Route path="/student/course/:id" element={<CourseView />} />
              <Route path="/student/schedule" element={<StudentSchedule />} />
              
              {/* Recruiter Routes */}
              <Route path="/recruiter/dashboard" element={<Dashboard />} />
              <Route path="/recruiter/post-internship" element={<PostInternship />} />
              <Route path="/recruiter/applications" element={<Applications />} />
              <Route path="/recruiter/applications/:id" element={<ApplicationsView />} />
              <Route path="/recruiter/jobs" element={<Jobs />} />
              <Route path="/recruiter/candidates" element={<Candidates />} />
              <Route path="/recruiter/talent-search" element={<TalentSearch />} />
              <Route path="/recruiter/assessment-stats" element={<AssessmentStats />} />
              <Route path="/recruiter/opportunities" element={<OpportunitiesManagement />} />
              <Route path="/recruiter/schedule" element={<Schedule />} />
              <Route path="/recruiter/challenges" element={<Challenges />} />
              <Route path="/recruiter/community" element={<Community />} />
              <Route path="/recruiter/mentorship" element={<MentorshipManage />} />
              <Route path="/recruiter/grievances" element={<GrievancePortal />} />
              <Route path="/recruiter/settings" element={<RecSettings />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
