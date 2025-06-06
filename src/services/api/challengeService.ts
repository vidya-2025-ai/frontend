
import api from './index';
import { Challenge, ChallengeSolution, PaginatedResponse } from './types';

export interface ChallengeFilters {
  difficulty?: string;
  skills?: string[];
  skillsRequired?: string[]; // Added this field to match component usage
  organization?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ChallengeStatistics {
  totalChallenges: number;
  activeChallenges: number;
  totalSubmissions: number;
  avgDifficulty: number;
  topSkills: {
    skill: string;
    count: number;
  }[];
  completionRate: number;
}

export const challengeService = {
  getAllChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    const response = await api.get<PaginatedResponse<Challenge>>('/challenges', { 
      params: filters 
    });
    return response.data.challenges || response.data.data || [];
  },
  
  // Alias for student component
  getChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    return challengeService.getAllChallenges(filters);
  },
  
  getRecruiterChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    const params = { ...filters };
    
    // Format skills array for query params if present
    if (filters.skills && filters.skills.length) {
      params.skills = filters.skills.join(',') as any;
    }
    
    // Format skillsRequired array if present (backward compatibility)
    if (filters.skillsRequired && filters.skillsRequired.length) {
      params.skillsRequired = filters.skillsRequired.join(',') as any;
    }
    
    const response = await api.get<PaginatedResponse<Challenge>>('/challenges/recruiter', {
      params
    });
    return response.data.challenges || [];
  },
  
  createChallenge: async (challengeData: any): Promise<Challenge> => {
    const response = await api.post<Challenge>('/challenges', challengeData);
    return response.data;
  },
  
  getChallenge: async (id: string): Promise<Challenge> => {
    const response = await api.get<Challenge>(`/challenges/${id}`);
    return response.data;
  },
  
  updateChallenge: async (id: string, challengeData: any): Promise<Challenge> => {
    const response = await api.put<Challenge>(`/challenges/${id}`, challengeData);
    return response.data;
  },
  
  deleteChallenge: async (id: string): Promise<void> => {
    await api.delete<void>(`/challenges/${id}`);
  },
  
  toggleChallengeStatus: async (id: string, isActive: boolean): Promise<Challenge> => {
    const response = await api.put<Challenge>(`/challenges/${id}/status`, { isActive });
    return response.data;
  },
  
  // Solution management endpoints
  submitSolution: async (challengeId: string, solutionData: any): Promise<ChallengeSolution> => {
    const response = await api.post<ChallengeSolution>(`/challenges/${challengeId}/solutions`, solutionData);
    return response.data;
  },
  
  getSolutions: async (challengeId: string): Promise<ChallengeSolution[]> => {
    const response = await api.get<ChallengeSolution[]>(`/challenges/${challengeId}/solutions`);
    return response.data;
  },
  
  evaluateSolution: async (challengeId: string, solutionId: string, evaluationData: any): Promise<ChallengeSolution> => {
    const response = await api.put<ChallengeSolution>(
      `/challenges/${challengeId}/solutions/${solutionId}/evaluate`, 
      evaluationData
    );
    return response.data;
  },
  
  // Statistics endpoints
  getChallengeStatistics: async (): Promise<ChallengeStatistics> => {
    const response = await api.get<ChallengeStatistics>('/challenges/recruiter/statistics');
    return response.data;
  },
  
  getStudentChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    const response = await api.get<PaginatedResponse<Challenge>>('/challenges/student', { 
      params: filters 
    });
    return response.data.challenges || response.data.data || [];
  },
};

export default challengeService;
