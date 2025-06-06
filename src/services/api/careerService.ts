import api from './index';

export interface CareerPath {
  id: number;
  name: string;
  progress: number;
  level: string;
}

export interface Milestone {
  id: number;
  name: string;
  completed: boolean;
  pathId: number;
  timeframe?: string;
}

export interface LearningPath {
  id: number;
  name: string;
  progress: number;
  modules: number;
}

export interface Project {
  id: number;
  name: string;
  tags: string[];
  deadline: string;
}

export interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  match: number;
  skills: string[];
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
}

export interface CareerData {
  careerPaths: CareerPath[];
  milestones: Milestone[];
  interests: string[];
}

export interface Recommendations {
  careerBased: Recommendation[];
  trending: Recommendation[];
}

export interface GeneratedRoadmap {
  desiredRole: string;
  estimatedTimeframe: string;
  careerPaths: CareerPath[];
  milestones: Milestone[];
  recommendedResources: string[];
}

export interface SkillAssessment {
  id: string;
  name: string;
  description: string;
  questions: {
    id: number;
    text: string;
    options: {
      id: number;
      text: string;
    }[];
  }[];
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  modules: CourseModule[];
}

export interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  deadline: string;
  teamMembers: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  tasks: {
    id: string;
    title: string;
    description: string;
    assignee: string;
    status: 'pending' | 'in-progress' | 'completed';
    deadline: string;
  }[];
  documentation: string;
}

export const careerService = {
  getCareerData: async (): Promise<CareerData> => {
    const response = await api.get<CareerData>('/career/paths');
    return response.data;
  },
  
  getRecommendedJobs: async (): Promise<RecommendedJob[]> => {
    const response = await api.get<RecommendedJob[]>('/career/recommended-jobs');
    return response.data;
  },
  
  updateCareerInterests: async (interests: string[]): Promise<{interests: string[]}> => {
    const response = await api.put<{interests: string[]}>('/career/interests', { interests });
    return response.data;
  },
  
  getLearningPaths: async (): Promise<LearningPath[]> => {
    const response = await api.get<LearningPath[]>('/career/learning-paths');
    return response.data;
  },
  
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/career/projects');
    return response.data;
  },
  
  getRecommendations: async (): Promise<Recommendations> => {
    const response = await api.get<Recommendations>('/career/recommendations');
    return response.data;
  },
  
  generateCareerRoadmap: async (desiredRole: string, currentSkills: string[] = [], experience: string = 'beginner'): Promise<GeneratedRoadmap> => {
    const response = await api.post<GeneratedRoadmap>('/career/generate-roadmap', {
      desiredRole,
      currentSkills,
      experience
    });
    return response.data;
  },
  
  startLearningPath: async (pathId: number): Promise<LearningPath> => {
    const response = await api.post<LearningPath>('/career/learning-paths/start', { pathId });
    return response.data;
  },
  
  joinProject: async (projectId: number): Promise<Project> => {
    const response = await api.post<Project>('/career/projects/join', { projectId });
    return response.data;
  },
  
  completeMilestone: async (milestoneId: number): Promise<Milestone> => {
    const response = await api.post<Milestone>('/career/milestones/complete', { milestoneId });
    return response.data;
  },
  
  completeModule: async (pathId: number, moduleId: number): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>('/career/modules/complete', { pathId, moduleId });
    return response.data;
  },
  
  getSkillAssessment: async (skillId: string): Promise<any> => {
    const response = await api.get<any>(`/career/skill-assessment/${skillId}`);
    return response.data;
  },
  
  submitSkillAssessment: async (skillId: string, answers: Record<number, number>): Promise<any> => {
    const response = await api.post<any>(`/career/skill-assessment/${skillId}/submit`, { answers });
    return response.data;
  },
  
  getCourseDetails: async (courseId: string): Promise<any> => {
    const response = await api.get<any>(`/career/courses/${courseId}`);
    return response.data;
  },
  
  getProjectDetails: async (projectId: string): Promise<any> => {
    const response = await api.get<any>(`/career/projects/${projectId}`);
    return response.data;
  },
  
  updateProjectTask: async (projectId: string, taskId: string, status: string): Promise<{ success: boolean }> => {
    const response = await api.put<{ success: boolean }>(`/career/projects/${projectId}/tasks/${taskId}`, { status });
    return response.data;
  }
};

export default careerService;
