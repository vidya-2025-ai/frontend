
import React from 'react';
import { Resume } from '@/services/api/types';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo?.name || 'Your Name'}</h1>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
            {resume.personalInfo?.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {resume.personalInfo.email}
              </div>
            )}
            {resume.personalInfo?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {resume.personalInfo.phone}
              </div>
            )}
            {resume.personalInfo?.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {resume.personalInfo.address}
              </div>
            )}
            {resume.personalInfo?.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                {resume.personalInfo.linkedin}
              </div>
            )}
            {resume.personalInfo?.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {resume.personalInfo.website}
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resume.personalInfo?.summary && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-3">
              {resume.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-green-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-green-600 font-medium">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map((project, index) => (
                <div key={index} className="border-l-2 border-purple-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    {project.status && (
                      <span className="text-sm text-gray-500">{project.status}</span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
