
import React from 'react';
import { User, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const studentSteps = [
  {
    id: 1,
    title: 'Create Your Profile',
    description: 'Sign up and build your profile with your skills, interests, and educational background.'
  },
  {
    id: 2,
    title: 'Explore Opportunities',
    description: 'Browse through curated internships and projects that match your skills and interests.'
  },
  {
    id: 3,
    title: 'Apply & Get Selected',
    description: 'Apply to opportunities that interest you and get selected based on your profile match.'
  },
  {
    id: 4,
    title: 'Start Your Project',
    description: 'Join the project room, communicate with the organization, and start working on your tasks.'
  },
  {
    id: 5,
    title: 'Receive Mentorship',
    description: 'Get guidance from experienced mentors throughout your project journey.'
  },
  {
    id: 6,
    title: 'Complete & Get Certified',
    description: 'Successfully complete your project and receive a verified certificate for your portfolio.'
  }
];

const orgSteps = [
  {
    id: 1,
    title: 'Register Your Organization',
    description: 'Sign up and verify your organization to establish your presence on the platform.'
  },
  {
    id: 2,
    title: 'Post Opportunities',
    description: 'Create detailed postings for internships, projects, or research opportunities.'
  },
  {
    id: 3,
    title: 'Review Applications',
    description: 'Receive applications from matched students and select the best candidates for your projects.'
  },
  {
    id: 4,
    title: 'Manage Projects',
    description: 'Use the project room to assign tasks, track progress, and communicate with students.'
  },
  {
    id: 5,
    title: 'Provide Mentorship',
    description: 'Offer guidance to students or let Vidya-Samveda assign mentors to your projects.'
  },
  {
    id: 6,
    title: 'Generate Impact',
    description: 'Complete projects, provide certificates, and track your impact with comprehensive reports.'
  }
];

const HowItWorks = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            A simple process to connect students and organizations for meaningful collaborations.
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="student" className="flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                <span>For Students</span>
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center justify-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>For Organizations</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-vs-green-200 rounded-full"></div>
                </div>
                <div className="relative space-y-8">
                  {studentSteps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex-grow-0 mr-4 flex items-center justify-center">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-vs-green-500 text-white font-bold z-10">
                          {step.id}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 flex-grow animate-fade-in">
                        <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="organization">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-vs-orange-200 rounded-full"></div>
                </div>
                <div className="relative space-y-8">
                  {orgSteps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex-grow-0 mr-4 flex items-center justify-center">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-vs-orange-400 text-white font-bold z-10">
                          {step.id}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 flex-grow animate-fade-in">
                        <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
