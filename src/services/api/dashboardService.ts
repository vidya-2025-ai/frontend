
import api from './index';
import { Application } from './types';
import { toast } from '@/components/ui/use-toast';

export interface DashboardStats {
  activeJobs: number;
  totalApplications: number;
  interviewsScheduled: number;
  mentorshipMatches: number;
  talentPoolSize: number;
}

export interface TalentPoolStats {
  talentPoolSize: number;
  educationDistribution: Record<string, number>;
  experienceDistribution: Record<string, number>;
  averageSkillMatch: number;
  skillGaps: string[];
}

export const dashboardService = {
  getRecruiterStats: async (): Promise<DashboardStats> => {
    try {
      console.log('Fetching recruiter dashboard stats...');
      const response = await api.get('/dashboard/recruiter/stats');
      console.log('Dashboard stats received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics. Please try again.",
        variant: "destructive",
      });
      // Return default values instead of throwing
      return {
        activeJobs: 0,
        totalApplications: 0,
        interviewsScheduled: 0,
        mentorshipMatches: 0,
        talentPoolSize: 0
      };
    }
  },
  
  getRecentApplications: async (limit: number = 5): Promise<Application[]> => {
    try {
      console.log('Fetching recent applications...');
      const response = await api.get('/dashboard/recruiter/recent', { 
        params: { limit } 
      });
      console.log('Recent applications received:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching recent applications:', error);
      toast({
        title: "Error",
        description: "Failed to load recent applications. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  getTalentStats: async (): Promise<TalentPoolStats> => {
    try {
      console.log('Fetching talent stats...');
      const response = await api.get('/dashboard/recruiter/talent');
      console.log('Talent stats received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching talent stats:', error);
      toast({
        title: "Error",
        description: "Failed to load talent statistics. Please try again.",
        variant: "destructive",
      });
      // Return default values
      return {
        talentPoolSize: 0,
        educationDistribution: {},
        experienceDistribution: { entry: 0, mid: 0, senior: 0 },
        averageSkillMatch: 0,
        skillGaps: []
      };
    }
  }
};

export default dashboardService;
