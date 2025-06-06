
import api from './index';
import { ATSParameter } from './types';

export interface ATSScore {
  score: number;
  details?: {
    matched: number;
    total: number;
  };
}

export const atsService = {
  getParameters: async (): Promise<ATSParameter[]> => {
    const response = await api.get<ATSParameter[]>('/ats/parameters');
    return response.data;
  },
  
  createParameters: async (parameterData: any): Promise<ATSParameter> => {
    const response = await api.post<ATSParameter>('/ats/parameters', parameterData);
    return response.data;
  },
  
  updateParameters: async (id: string, parameterData: any): Promise<ATSParameter> => {
    const response = await api.put<ATSParameter>(`/ats/parameters/${id}`, parameterData);
    return response.data;
  },
  
  calculateScore: async (resumeId: string, parameterId: string): Promise<ATSScore> => {
    const response = await api.post<ATSScore>('/ats/calculate-score', { resumeId, parameterId });
    return response.data;
  },
  
  // Updated method to use the correct endpoint that exists
  calculateScoreForOpportunity: async (resumeId: string, opportunityId: string): Promise<ATSScore> => {
    const response = await api.post<ATSScore>('/ats/calculate-opportunity-score', { 
      resumeId, 
      opportunityId 
    });
    return response.data;
  }
};

export default atsService;
