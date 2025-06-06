import api from './index';
import { Skill, UserSkill, PaginatedResponse } from './types';

export const skillService = {
  getAllSkills: async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>('/skills/all');
    return response.data;
  },
  
  getUserSkills: async (): Promise<UserSkill[]> => {
    const response = await api.get<UserSkill[]>('/skills/user');
    return response.data;
  },
  
  addUserSkill: async (skillData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>('/skills/user', skillData);
    return response.data;
  },
  
  updateUserSkill: async (skillId: string, skillData: any): Promise<UserSkill> => {
    const response = await api.put<UserSkill>(`/skills/user/${skillId}`, skillData);
    return response.data;
  },
  
  deleteUserSkill: async (skillId: string): Promise<void> => {
    await api.delete(`/skills/user/${skillId}`);
  },
  
  addSkillAssessment: async (skillId: string, assessmentData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>(`/skills/user/${skillId}/assessment`, assessmentData);
    return response.data;
  }
};

export default skillService;
