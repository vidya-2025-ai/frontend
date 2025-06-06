
import api from './index';
import { Resume } from './types';

export const resumeService = {
  getAllResumes: async (): Promise<Resume[]> => {
    const response = await api.get<Resume[]>('/resume');
    return response.data;
  },
  
  getResumeById: async (id: string): Promise<Resume> => {
    const response = await api.get<Resume>(`/resume/${id}`);
    return response.data;
  },
  
  createResume: async (resumeData: any): Promise<Resume> => {
    const response = await api.post<Resume>('/resume', resumeData);
    return response.data;
  },
  
  updateResume: async (id: string, resumeData: any): Promise<Resume> => {
    const response = await api.put<Resume>(`/resume/${id}`, resumeData);
    return response.data;
  },

  deleteResume: async (id: string): Promise<void> => {
    const response = await api.delete<void>(`/resume/${id}`);
    return response.data;
  },

  uploadResume: async (file: File): Promise<Resume> => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post<Resume>('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default resumeService;
