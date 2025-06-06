
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  Award, 
  FileCheck, 
  BarChart4,
  UserCheck,
  MessageSquareHeart,
  FileSearch,
  Database,
  ArrowRight,
  LayoutGrid,
  Calendar,
  CheckCircle2,
  Puzzle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 md:py-24 bg-gradient-to-r from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              How Vidya-Samveda Works
            </h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-800 font-medium">
              Vidya Samveda connects students, colleges, and recruiters in an integrated ecosystem designed for career growth and opportunity.
            </p>
          </div>
        </section>
        
        {/* For Students Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-white via-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">For Students</h2>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
                Start your career journey with tools that matter:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Create a smart profile</h3>
                    <p className="text-gray-800 mt-1">With your skills and goals clearly defined</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-indigo-100">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <FileSearch className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Apply to opportunities</h3>
                    <p className="text-gray-800 mt-1">Micro-internships, projects, and mentorships</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-purple-100">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <FileCheck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Improve your resume</h3>
                    <p className="text-gray-800 mt-1">With AI-powered tools and ATS score evaluation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-pink-100">
                <div className="flex items-start mb-4">
                  <div className="bg-pink-100 p-2 rounded-full mr-4">
                    <Award className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Earn certificates</h3>
                    <p className="text-gray-800 mt-1">Join challenges and build real-world experience</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-cyan-100">
                <div className="flex items-start mb-4">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4">
                    <BarChart4 className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Track your progress</h3>
                    <p className="text-gray-800 mt-1">Monitor applications and career progress in one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Colleges Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-white via-indigo-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block p-3 rounded-full bg-indigo-100 mb-4">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">For Educational Instituitions</h2>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
                Streamline campus placements and empower your students:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-indigo-100">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Onboard and manage</h3>
                    <p className="text-gray-800 mt-1">Student profiles and career tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-purple-100">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <LayoutGrid className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Monitor placement</h3>
                    <p className="text-gray-800 mt-1">Placement drives and application activity</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <MessageSquareHeart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Organize mentorship</h3>
                    <p className="text-gray-800 mt-1">Alumni and expert mentorship programs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-pink-100">
                <div className="flex items-start mb-4">
                  <div className="bg-pink-100 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Resolve grievances</h3>
                    <p className="text-gray-800 mt-1">With a transparent and efficient system</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-cyan-100">
                <div className="flex items-start mb-4">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4">
                    <Database className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Access analytics</h3>
                    <p className="text-gray-800 mt-1">Detailed insights on student and institutional performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Recruiters Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-white via-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">For Recruiters</h2>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
                Find and hire job-ready talent with zero clutter:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FileSearch className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Post opportunities</h3>
                    <p className="text-gray-800 mt-1">Jobs and internships directly to verified student pools</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-indigo-100">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Puzzle className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Use intelligent filters</h3>
                    <p className="text-gray-800 mt-1">ATS tools for effective candidate shortlisting</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-purple-100">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Schedule interviews</h3>
                    <p className="text-gray-800 mt-1">And assessments directly through the platform</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-pink-100">
                <div className="flex items-start mb-4">
                  <div className="bg-pink-100 p-2 rounded-full mr-4">
                    <MessageSquareHeart className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Engage with students</h3>
                    <p className="text-gray-800 mt-1">Through mentorships or corporate challenges</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6 border border-cyan-100">
                <div className="flex items-start mb-4">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Hire with confidence</h3>
                    <p className="text-gray-800 mt-1">Using transparent, data-backed insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* The Outcome Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-indigo-50 to-blue-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">The Outcome</h2>
            <p className="text-xl text-gray-800 mb-8 font-medium">
              An all-in-one ecosystem where students upskill, colleges manage placements smartly, and recruiters discover quality talent faster.
            </p>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
              <div className="flex flex-col md:flex-row justify-between items-center text-left">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to get started?</h3>
                  <p className="text-gray-800 mb-4 font-medium">
                    Join thousands of students, colleges, and recruiters already on the platform and start your journey today.
                  </p>
                  <Link to="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center shadow-md">
                      Join Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                    <div className="text-white text-center">
                      <p className="text-4xl font-bold">Join</p>
                      <p className="text-xl">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
