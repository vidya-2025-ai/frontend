
import api from './index';
import { Grievance, GrievanceResponse, PaginatedResponse } from './types';

export interface GrievanceFilters {
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface GrievanceStatistics {
  totalGrievances: number;
  resolvedGrievances: number;
  pendingGrievances: number;
  avgResolutionTime: number;
  grievancesByCategory: {
    category: string;
    count: number;
  }[];
}

export const grievanceService = {
  getAllGrievances: async (filters: GrievanceFilters = {}): Promise<Grievance[]> => {
    const response = await api.get<PaginatedResponse<Grievance>>('/grievances', { 
      params: filters 
    });
    return response.data.grievances || response.data.data || [];
  },
  
  // Alias for the student component
  getGrievances: async (filters: GrievanceFilters = {}): Promise<Grievance[]> => {
    return grievanceService.getAllGrievances(filters);
  },
  
  getStudentGrievances: async (filters: GrievanceFilters = {}): Promise<Grievance[]> => {
    const response = await api.get<PaginatedResponse<Grievance>>('/grievances/student', { 
      params: filters 
    });
    return response.data.grievances || response.data.data || [];
  },
  
  fileGrievance: async (grievanceData: { title: string; description: string; category: string }): Promise<Grievance> => {
    const response = await api.post<Grievance>('/grievances', grievanceData);
    return response.data;
  },
  
  getGrievanceById: async (id: string): Promise<Grievance> => {
    const response = await api.get<Grievance>(`/grievances/${id}`);
    return response.data;
  },
  
  updateGrievance: async (id: string, grievanceData: { title?: string; description?: string; status?: string }): Promise<Grievance> => {
    const response = await api.put<Grievance>(`/grievances/${id}`, grievanceData);
    return response.data;
  },
  
  deleteGrievance: async (id: string): Promise<void> => {
    await api.delete<void>(`/grievances/${id}`);
  },
  
  addResponse: async (id: string, responseData: { content: string }): Promise<GrievanceResponse> => {
    const response = await api.post<GrievanceResponse>(`/grievances/${id}/responses`, responseData);
    return response.data;
  },

  // Alias for the student component
  respondToGrievance: async (id: string, responseData: { content: string }): Promise<GrievanceResponse> => {
    return grievanceService.addResponse(id, responseData);
  },
  
  updateStatus: async (id: string, status: string): Promise<Grievance> => {
    const response = await api.put<Grievance>(`/grievances/${id}/status`, { status });
    return response.data;
  },
  
  // Alias for the student component
  closeGrievance: async (id: string): Promise<Grievance> => {
    return grievanceService.updateStatus(id, 'closed');
  },
  
  getGrievanceStatistics: async (): Promise<GrievanceStatistics> => {
    const response = await api.get<GrievanceStatistics>('/grievances/recruiter/statistics');
    return response.data;
  }
};

export default grievanceService;
