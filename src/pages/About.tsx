
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Route } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 md:py-24 bg-gradient-to-r from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-8xl font-bold mb-10 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Bridging Campuses to Careers
            </h1>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-800 dark:text-gray-300 font-medium">
              An integrated career ecosystem empowering students, institutions, and recruiters through mentorship, micro-internships, and intelligent career tools.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-[#00d4ff] to-[#00a3cc] hover:from-[#00a3cc] hover:to-[#007399] text-white transition-all duration-300 shadow-lg">
                Join Now
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-12 bg-gradient-to-r from-white via-purple-50 to-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">The Problem</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-white to-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-all hover:shadow-lg border border-blue-100">
                <p className="text-lg text-gray-800 font-medium">Students face a lack of industry exposure and practical career guidance.</p>
              </div>
              <div className="bg-gradient-to-br from-white to-indigo-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-all hover:shadow-lg border border-indigo-100">
                <p className="text-lg text-gray-800 font-medium">Institutions struggle to ensure holistic placement preparation and visibility.</p>
              </div>
              <div className="bg-gradient-to-br from-white to-purple-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-all hover:shadow-lg border border-purple-100">
                <p className="text-lg text-gray-800 font-medium">Recruiters face difficulty accessing job-ready, skilled candidates efficiently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Vidya-Samveda Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">What is Vidya-Samveda?</h2>
            <p className="text-lg text-center mb-10 max-w-4xl mx-auto text-gray-800 dark:text-gray-300 font-medium">
              Vidya-Samveda is a unified digital platform that connects students, colleges, and companies through verified career tools, project-based internships, mentorship, and AI-driven hiring solutions. It focuses on employability, industry alignment, and personalized upskilling.
            </p>
          </div>
        </section>

        {/* For Students, Institutions, Recruiters Section */}
        <section className="py-12 bg-gradient-to-r from-white via-indigo-50 to-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-[#007bff]">For Students 🧑‍🎓</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium"> Personalized career roadmap</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Micro-internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Resume Builder & ATS Score Evaluator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Mentorship from industry professionals and networking capabilities through Communtiy Hub</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Earn certificates, join challenges, and build real-world experience</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg shadow-sm relative bg-gradient-to-br from-white to-indigo-50 hover:shadow-md transition-all duration-300">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-xs font-bold px-2 py-1 rounded-full text-white">
                  Coming Soon
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#00d4ff]">For Educational Instituitions🏫 </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#00d4ff]">•</span>
                    <span className="text-gray-800 font-medium">Placement dashboard & analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#00d4ff]">•</span>
                    <span className="text-gray-800 font-medium">Resume bank with skill mapping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#00d4ff]">•</span>
                    <span className="text-gray-800 font-medium">Job posting & drive management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#00d4ff]">•</span>
                    <span className="text-gray-800 font-medium">Mentor & alumni engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#00d4ff]">•</span>
                    <span className="text-gray-800 font-medium">Grievance redressal & feedback loop</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg shadow-sm bg-gradient-to-br from-white to-purple-50 hover:shadow-md transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-[#007bff]"> For Recruiters 🧑‍💼</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Post jobs & access verified candidates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">AI-based talent search with ATS compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Track applications, schedule interviews</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">Host mentorships, assessments, and challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#007bff]">•</span>
                    <span className="text-gray-800 font-medium">End-to-end applicant tracking & insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Why Choose Vidya-Samveda?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Centralized and collaborative platform</h3>
              </div>
              <div className="bg-gradient-to-br from-white to-indigo-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Enhances career readiness and employability</h3>
              </div>
              <div className="bg-gradient-to-br from-white to-purple-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Verified skill development with real-time industry exposure</h3>
              </div>
              <div className="bg-gradient-to-br from-white to-pink-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-pink-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Transparent and scalable for institutions</h3>
              </div>
              <div className="bg-gradient-to-br from-white to-cyan-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Efficient and smart recruitment for companies</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#007bff] via-[#3d9bff] to-[#00d4ff] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Join the Ecosystem</h2>
            <p className="text-xl mb-8 text-white">Be part of the next-generation career platform that drives outcomes — not just processes.</p>
            <p className="text-2xl font-semibold mb-8 text-white">Start now. Empower futures.</p>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-white text-[#007bff] hover:bg-gray-100 border-white shadow-lg font-medium">
                Join Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
