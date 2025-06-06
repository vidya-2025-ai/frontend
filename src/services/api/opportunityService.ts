import api from './index';
import { Opportunity } from './types';
import { toast } from '@/components/ui/use-toast';

export const opportunityService = {
  getAllOpportunities: async (filters = {}): Promise<Opportunity[]> => {
    try {
      console.log('Fetching opportunities with filters:', filters);
      const response = await api.get<{opportunities: Opportunity[], pagination: any}>('/opportunities', { params: filters });
      console.log('Opportunities API response:', response.data);
      
      // The backend returns {opportunities: [...], pagination: {...}}
      const opportunities = response.data.opportunities || response.data;
      return Array.isArray(opportunities) ? opportunities : [];
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunities. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  getRecruiterOpportunities: async (filters = {}): Promise<Opportunity[]> => {
    try {
      console.log('Fetching recruiter opportunities with filters:', filters);
      const response = await api.get<Opportunity[]>('/opportunities/recruiter', { params: filters });
      console.log('Recruiter opportunities fetched:', response.data);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching recruiter opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load your opportunities. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },

  getCandidates: async (opportunityId: string, filters = {}): Promise<any[]> => {
    try {
      console.log(`Fetching candidates for opportunity ${opportunityId} with filters:`, filters);
      const response = await api.get<any[]>(`/opportunities/${opportunityId}/candidates`, { params: filters });
      console.log('Candidates fetched:', response.data);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to load candidates. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  createOpportunity: async (opportunityData: any): Promise<Opportunity> => {
    try {
      console.log('Creating opportunity:', opportunityData);
      const response = await api.post<Opportunity>('/opportunities', opportunityData);
      console.log('Opportunity created:', response.data);
      toast({
        title: "Success",
        description: "Opportunity created successfully.",
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating opportunity:', error);
      const errorMessage = error.response?.data?.message || "Failed to create opportunity. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getOpportunityById: async (id: string): Promise<Opportunity> => {
    try {
      console.log(`Fetching opportunity ${id}`);
      const response = await api.get<Opportunity>(`/opportunities/${id}`);
      console.log('Opportunity details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportunity details:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunity details. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  updateOpportunity: async (id: string, opportunityData: any): Promise<Opportunity> => {
    try {
      console.log(`Updating opportunity ${id}:`, opportunityData);
      const response = await api.put<Opportunity>(`/opportunities/${id}`, opportunityData);
      console.log('Opportunity updated:', response.data);
      toast({
        title: "Success",
        description: "Opportunity updated successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to update opportunity. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  deleteOpportunity: async (id: string): Promise<void> => {
    try {
      console.log(`Deleting opportunity ${id}`);
      await api.delete(`/opportunities/${id}`);
      console.log('Opportunity deleted successfully');
      toast({
        title: "Success",
        description: "Opportunity deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to delete opportunity. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  searchOpportunities: async (searchParams: any): Promise<Opportunity[]> => {
    try {
      console.log('Searching opportunities with params:', searchParams);
      const response = await api.get<{opportunities: Opportunity[], pagination: any}>('/opportunities/search', { params: searchParams });
      console.log('Search results:', response.data);
      
      // Handle the same response structure as getAllOpportunities
      const opportunities = response.data.opportunities || response.data;
      return Array.isArray(opportunities) ? opportunities : [];
    } catch (error) {
      console.error('Error searching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to search opportunities. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  }
};

export default opportunityService;
