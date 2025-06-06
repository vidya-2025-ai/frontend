
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    content: "Optern connected me with an NGO working on education technology. The experience completely changed my career path, and I'm now working full-time in the social impact sector.",
    author: "Priya Sharma",
    role: "Computer Science Student",
    organization: "IIT Roorkee"
  },
  {
    content: "As a rural college student, I never had access to quality internships. Through Optern, I worked remotely with a startup on their mobile app and gained skills that helped me secure a job offer.",
    author: "Arjun Mehta",
    role: "Engineering Student",
    organization: "Government Engineering College, Rajasthan"
  },
  {
    content: "Our NGO found incredible talent through this platform. The students brought fresh perspectives to our environmental conservation project. The mentorship component ensures quality work.",
    author: "Lakshmi Nair",
    role: "Program Director",
    organization: "EcoSolutions Foundation"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Hear from students and organizations who have connected through our platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="vs-card p-6 flex flex-col h-full">
              <div className="flex-grow">
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
              </div>
              <div className="mt-4 flex items-center">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarFallback className="bg-blue-100 text-[#007bff]">
                    {testimonial.author.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-600">{testimonial.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
