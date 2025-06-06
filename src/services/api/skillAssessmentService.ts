
import api from './index';

export interface SkillCategory {
  category: string;
  count: number;
}

export interface SkillStatistics {
  topSkills: Array<{
    _id: string;
    name: string;
    category: string;
    userCount: number;
    averageScore: number;
  }>;
  skillsByCategory: SkillCategory[];
  assessmentScores: Array<{
    score: number;
    count: number;
  }>;
  totalCandidates?: number;
  totalAssessments?: number;
}

export interface CandidateAssessment {
  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  skills: Array<{
    skill: {
      _id: string;
      name: string;
      category: string;
    };
    level: number;
    assessments: Array<{
      score: number;
      date: string;
    }>;
  }>;
  totalAssessments: number;
  averageScore: number;
}

export const skillAssessmentService = {
  getAllSkills: async (): Promise<Array<{
    _id: string;
    name: string;
    category: string;
    description?: string;
  }>> => {
    const response = await api.get('/skills/all');
    return response.data;
  },
  
  getSkillCategories: async (): Promise<SkillCategory[]> => {
    const response = await api.get('/skills/categories');
    return response.data;
  },
  
  getAssessmentStatistics: async (): Promise<SkillStatistics> => {
    const response = await api.get('/skills/assessments/stats');
    return response.data;
  },
  
  getCandidateAssessmentsByOpportunity: async (opportunityId: string): Promise<CandidateAssessment[]> => {
    const response = await api.get(`/skills/assessments/opportunity/${opportunityId}`);
    return response.data;
  }
};

export default skillAssessmentService;
