
import api from './index';
import { User, PaginatedResponse } from './types';

export interface CandidateFilters {
  role?: string;
  name?: string;
  skills?: string[];
  location?: string;
  experienceLevel?: string;
  education?: string;
  availability?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  search?: string;
}

export interface CandidateStatistics {
  totalCandidates: number;
  bySkill: {
    skill: string;
    count: number;
  }[];
  byExperience: {
    level: string;
    count: number;
  }[];
  byLocation: {
    location: string;
    count: number;
  }[];
}

export interface CandidateWithResume extends User {
  resume?: {
    id: string;
    title: string;
    atsScore: number;
    skills: string[];
    experience: any[];
    education: any[];
  };
  resumes?: {
    id: string;
    title: string;
    atsScore: number;
    skills: string[];
    experience: any[];
    education: any[];
    lastUpdated: string;
  }[];
  profileCompleteness?: number;
}

export interface OpportunityCandidate {
  application: {
    id: string;
    status: string;
    appliedDate: string;
    coverLetter?: string;
  };
  candidate: CandidateWithResume;
}

const candidateService = {
  searchCandidates: async (filters: CandidateFilters = {}): Promise<CandidateWithResume[]> => {
    try {
      console.log('Searching candidates with filters:', filters);
      
      // Clean up filters - remove empty strings and null values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'skills' && Array.isArray(value)) {
            acc[key] = value.filter(skill => skill.trim() !== '').join(',');
          } else if (typeof value === 'string' && value.trim() === '') {
            // Skip empty strings
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {} as any);

      console.log('Clean filters being sent:', cleanFilters);
      
      const response = await api.get<PaginatedResponse<CandidateWithResume>>('/candidates/search', { 
        params: cleanFilters
      });
      
      console.log('Candidates search response:', response.data);
      
      // Handle different response formats
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error searching candidates:', error);
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  },
  
  getCandidateById: async (id: string): Promise<CandidateWithResume | null> => {
    try {
      console.log(`Fetching candidate details for ID: ${id}`);
      const response = await api.get<CandidateWithResume>(`/candidates/${id}`);
      console.log('Candidate details response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      return null;
    }
  },
  
  getCandidateStatistics: async (): Promise<CandidateStatistics | null> => {
    try {
      console.log('Fetching candidate statistics');
      const response = await api.get<CandidateStatistics>('/candidates/statistics');
      console.log('Candidate statistics response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate statistics:', error);
      return null;
    }
  },
  
  getCandidatesForOpportunity: async (opportunityId: string): Promise<{
    opportunity: any;
    applicants: OpportunityCandidate[];
  } | null> => {
    try {
      console.log(`Fetching candidates for opportunity: ${opportunityId}`);
      const response = await api.get<{
        opportunity: any;
        applicants: OpportunityCandidate[];
      }>(`/candidates/opportunity/${opportunityId}`);
      
      console.log('Opportunity candidates response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportunity candidates:', error);
      return null;
    }
  }
};

export default candidateService;
