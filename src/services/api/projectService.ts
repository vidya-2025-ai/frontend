
import api from './index';
import { Resume } from './types';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  startDate?: string;
  endDate?: string;
  status: 'Completed' | 'In Progress' | 'On Hold';
  source: 'resume' | 'projects'; // To track where the project comes from
  resumeId?: string; // Link to source resume
}

export const projectService = {
  // Get all projects from resumes
  getProjectsFromResumes: async (): Promise<Project[]> => {
    try {
      const response = await api.get<Resume[]>('/resume');
      const resumes = response.data;
      
      const projects: Project[] = [];
      
      resumes.forEach(resume => {
        if (resume.projects && Array.isArray(resume.projects)) {
          resume.projects.forEach((project, index) => {
            projects.push({
              id: `${resume._id || resume.id}-${index}`,
              title: project.title,
              description: project.description,
              technologies: project.technologies || [],
              link: project.link,
              githubLink: project.githubLink,
              startDate: project.startDate,
              endDate: project.endDate,
              status: project.status || 'Completed',
              source: 'resume',
              resumeId: resume._id || resume.id
            });
          });
        }
      });
      
      return projects;
    } catch (error) {
      console.error('Error fetching projects from resumes:', error);
      return [];
    }
  }
};

export default projectService;
