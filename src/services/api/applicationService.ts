import api from './index';
import { Application, ApplicationReview } from './types';
import { toast } from '@/components/ui/use-toast';

export const applicationService = {
  getStudentApplications: async (): Promise<Application[]> => {
    try {
      console.log('Fetching student applications...');
      const response = await api.get<Application[]>('/applications/student');
      console.log('Student applications fetched:', response.data);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching student applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  getRecruiterApplications: async (filters = {}): Promise<Application[]> => {
    try {
      console.log('Fetching recruiter applications with filters:', filters);
      const response = await api.get<Application[]>('/applications/recruiter', { params: filters });
      console.log('Recruiter applications fetched:', response.data);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching recruiter applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  createApplication: async (opportunityId: string, applicationData: any): Promise<Application> => {
    try {
      console.log(`Creating application for opportunity ${opportunityId}:`, applicationData);
      const response = await api.post<Application>(`/applications/opportunity/${opportunityId}`, applicationData);
      console.log('Application created:', response.data);
      toast({
        title: "Success",
        description: "Application submitted successfully.",
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating application:', error);
      const errorMessage = error.response?.data?.message || "Failed to submit application. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },
  
  updateApplicationStatus: async (id: string, status: string): Promise<Application> => {
    try {
      console.log(`Updating application ${id} status to ${status}`);
      const response = await api.put<Application>(`/applications/${id}/status`, { status });
      console.log('Application status updated:', response.data);
      toast({
        title: "Success",
        description: "Application status updated successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getApplicationDetails: async (id: string): Promise<Application> => {
    try {
      console.log(`Fetching application details for ${id}`);
      const response = await api.get<Application>(`/applications/${id}`);
      console.log('Application details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      toast({
        title: "Error",
        description: "Failed to load application details. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  addReview: async (id: string, reviewData: ApplicationReview): Promise<Application> => {
    try {
      console.log(`Adding review to application ${id}:`, reviewData);
      const response = await api.post<Application>(`/applications/${id}/review`, reviewData);
      console.log('Review added:', response.data);
      toast({
        title: "Success",
        description: "Review added successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getApplicationsByOpportunity: async (opportunityId: string): Promise<Application[]> => {
    try {
      console.log(`Fetching applications for opportunity ${opportunityId}`);
      const response = await api.get<Application[]>(`/applications/opportunity/${opportunityId}`);
      console.log('Applications by opportunity:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching applications by opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to load applicants. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  uploadResumeFile: async (file: File): Promise<{ resumeUrl: string }> => {
    try {
      console.log('Uploading resume file:', file.name);
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Please upload a PDF, DOC, or DOCX file');
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }
      
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await api.post<{ resumeUrl: string }>('/applications/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Resume uploaded:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error uploading resume:', error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to upload resume. Please try again.";
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },

  scheduleInterview: async (id: string, interviewDate: string): Promise<Application> => {
    try {
      console.log(`Scheduling interview for application ${id} on ${interviewDate}`);
      const response = await api.put<Application>(`/applications/${id}/interview`, { interviewDate });
      console.log('Interview scheduled:', response.data);
      toast({
        title: "Success",
        description: "Interview scheduled successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  addNote: async (id: string, note: string): Promise<Application> => {
    try {
      console.log(`Adding note to application ${id}:`, note);
      const response = await api.post<Application>(`/applications/${id}/notes`, { note });
      console.log('Note added:', response.data);
      toast({
        title: "Success",
        description: "Note added successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  addFeedback: async (id: string, feedback: string, rating?: number): Promise<Application> => {
    try {
      console.log(`Adding feedback to application ${id}:`, { feedback, rating });
      const response = await api.post<Application>(`/applications/${id}/feedback`, { feedback, rating });
      console.log('Feedback added:', response.data);
      toast({
        title: "Success",
        description: "Feedback added successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error adding feedback:', error);
      toast({
        title: "Error",
        description: "Failed to add feedback. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }
};

export default applicationService;
