import api from './index';
import { MentorshipRequest, User, PaginatedResponse } from './types';
import { MentorshipProgram } from './types/mentorship';

export interface MentorshipFilters {
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface MentorshipStatistics {
  totalRequests: number;
  acceptedRequests: number;
  pendingRequests: number;
  rejectedRequests: number;
  activeMentees?: number;
  activePrograms?: number;
  topMentors: {
    id: string;
    name: string;
    requestsCount: number;
  }[];
}

export const mentorshipService = {
  getAllMentorships: async (filters: MentorshipFilters = {}): Promise<MentorshipRequest[]> => {
    try {
      console.log('Fetching all mentorships with filters:', filters);
      const response = await api.get<PaginatedResponse<MentorshipRequest>>('/mentorship', { 
        params: filters 
      });
      console.log('All mentorships response:', response.data);
      return response.data.mentorships || response.data.data || [];
    } catch (error) {
      console.error('Error fetching all mentorships:', error);
      throw error;
    }
  },
  
  getMyMentorships: async (filters: MentorshipFilters = {}): Promise<MentorshipRequest[]> => {
    try {
      console.log('Fetching my mentorships with filters:', filters);
      const response = await api.get<PaginatedResponse<MentorshipRequest>>('/mentorship/my', { 
        params: filters 
      });
      console.log('My mentorships response:', response.data);
      return response.data.mentorships || response.data.data || [];
    } catch (error) {
      console.error('Error fetching my mentorships:', error);
      throw error;
    }
  },
  
  createMentorshipRequest: async (mentorshipData: any): Promise<MentorshipRequest> => {
    try {
      console.log('Creating mentorship request:', mentorshipData);
      const response = await api.post<MentorshipRequest>('/mentorship/request', mentorshipData);
      console.log('Created mentorship request:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating mentorship request:', error);
      throw error;
    }
  },
  
  updateMentorshipStatus: async (id: string, status: string): Promise<MentorshipRequest> => {
    try {
      console.log(`Updating mentorship ${id} status to ${status}`);
      const response = await api.put<MentorshipRequest>(`/mentorship/${id}/status`, { status });
      console.log('Updated mentorship status:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating mentorship status:', error);
      throw error;
    }
  },
  
  getMentorshipStatistics: async (): Promise<MentorshipStatistics> => {
    try {
      console.log('Fetching mentorship statistics');
      const response = await api.get<MentorshipStatistics>('/mentorship/statistics');
      console.log('Mentorship statistics:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching mentorship statistics:', error);
      throw error;
    }
  },
  
  getMentorshipStats: async (): Promise<MentorshipStatistics> => {
    return mentorshipService.getMentorshipStatistics();
  },
  
  getAvailableMentors: async (filters: any = {}): Promise<User[]> => {
    try {
      console.log('Fetching available mentors with filters:', filters);
      const response = await api.get<PaginatedResponse<User>>('/mentorship/mentors', { 
        params: filters 
      });
      console.log('Available mentors response:', response.data);
      return response.data.mentors || response.data.data || [];
    } catch (error) {
      console.error('Error fetching available mentors:', error);
      throw error;
    }
  },
  
  getRecentRequests: async (limit: number = 5): Promise<MentorshipRequest[]> => {
    try {
      console.log('Fetching recent requests with limit:', limit);
      const response = await api.get<MentorshipRequest[]>('/mentorship/recent', { 
        params: { limit } 
      });
      console.log('Recent requests response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent requests:', error);
      throw error;
    }
  },
  
  createMentorshipProgram: async (programData: {
    title: string;
    description: string;
    duration: string;
    skillsOffered: string[];
    maxParticipants: number;
    requirements: string[];
  }): Promise<MentorshipProgram> => {
    try {
      console.log('Creating mentorship program:', programData);
      const response = await api.post<MentorshipProgram>('/mentorship/programs', programData);
      console.log('Created mentorship program:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating mentorship program:', error);
      throw error;
    }
  },
  
  getMentorshipPrograms: async (filters: any = {}): Promise<MentorshipProgram[]> => {
    try {
      console.log('Fetching mentorship programs with filters:', filters);
      const response = await api.get<{programs: MentorshipProgram[]}>('/mentorship/programs', { 
        params: filters 
      });
      console.log('Mentorship programs response:', response.data);
      return response.data.programs || [];
    } catch (error) {
      console.error('Error fetching mentorship programs:', error);
      throw error;
    }
  },
  
  applyToMentorshipProgram: async (programId: string, message: string): Promise<MentorshipRequest> => {
    try {
      console.log(`Applying to mentorship program ${programId}:`, message);
      const response = await api.post<MentorshipRequest>(`/mentorship/programs/${programId}/apply`, { message });
      console.log('Applied to mentorship program:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error applying to mentorship program:', error);
      throw error;
    }
  }
};

export default mentorshipService;
