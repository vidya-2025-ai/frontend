
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Globe, 
  ArrowRight, 
  BookOpen, 
  Users 
} from 'lucide-react';

const opportunities = [
  {
    id: 1,
    title: 'Environmental Impact Research Assistant',
    organization: 'Green Earth Foundation',
    type: 'internship',
    location: 'Remote',
    duration: '3 months',
    category: 'Environmental',
    icon: Globe,
    color: 'bg-blue-100 text-[#007bff]'
  },
  {
    id: 2,
    title: 'Mobile App Developer for Education Platform',
    organization: 'LearnTech Startup',
    type: 'project',
    location: 'Hybrid',
    duration: '2 months',
    category: 'Technology',
    icon: BookOpen,
    color: 'bg-sky-100 text-[#00d4ff]'
  },
  {
    id: 3,
    title: 'Community Outreach Coordinator',
    organization: 'Village Empowerment Trust',
    type: 'internship',
    location: 'On-site',
    duration: '4 months',
    category: 'Social Work',
    icon: Users,
    color: 'bg-blue-100 text-[#007bff]'
  }
];

const OpportunitiesPreview = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Opportunities
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Discover meaningful internships and projects that align with your skills and interests.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="vs-card overflow-hidden flex flex-col h-full">
              <div className={`p-4 ${opportunity.color}`}>
                <opportunity.icon className="h-8 w-8" />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{opportunity.title}</h3>
                  <span className="vs-badge bg-blue-100 text-[#007bff]">
                    {opportunity.type === 'internship' ? 'Internship' : 'Project'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{opportunity.organization}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {opportunity.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    {opportunity.category}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to="/register">
                  <Button variant="outline" className="w-full text-[#007bff] border-[#007bff] hover:bg-blue-50">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/register">
            <Button className="vs-btn-primary inline-flex items-center">
              Explore All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPreview;
