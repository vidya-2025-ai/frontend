
import api from './index';
import { MicroInternship, MicroInternshipApplication } from './types';

export const microInternshipService = {
  getAllMicroInternships: async (): Promise<MicroInternship[]> => {
    const response = await api.get<MicroInternship[]>('/micro-internships');
    return response.data;
  },
  
  createMicroInternship: async (internshipData: any): Promise<MicroInternship> => {
    const response = await api.post<MicroInternship>('/micro-internships', internshipData);
    return response.data;
  },
  
  applyToMicroInternship: async (internshipId: string, applicationData: any = {}): Promise<MicroInternshipApplication> => {
    const response = await api.post<MicroInternshipApplication>(`/micro-internships/${internshipId}/apply`, applicationData);
    return response.data;
  },
  
  getApplications: async (internshipId: string): Promise<MicroInternshipApplication[]> => {
    const response = await api.get<MicroInternshipApplication[]>(`/micro-internships/${internshipId}/applications`);
    return response.data;
  },
  
  updateMicroInternshipStatus: async (
    applicationId: string, 
    status: 'accepted' | 'rejected' | 'shortlisted'
  ): Promise<any> => {
    const response = await api.put<any>(`/micro-internships/applications/${applicationId}/status`, { status });
    return response.data;
  }
};

export default microInternshipService;
