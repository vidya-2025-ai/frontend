
import api from './index';
import { toast } from '@/components/ui/use-toast';

export interface InterviewSchedule {
  id?: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  position: string;
  recruiterId: string;
  recruiterName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  meetingLink?: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  type: 'Technical' | 'HR Round' | 'Final Round' | 'Screening';
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const interviewService = {
  scheduleInterview: async (interviewData: Omit<InterviewSchedule, 'id'>): Promise<InterviewSchedule> => {
    try {
      console.log('Scheduling interview:', interviewData);
      const response = await api.post<InterviewSchedule>('/interviews/schedule', interviewData);
      console.log('Interview scheduled:', response.data);
      toast({
        title: "Interview Scheduled",
        description: `Interview with ${interviewData.candidateName} scheduled successfully.`,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error scheduling interview:', error);
      const errorMessage = error.response?.data?.message || "Failed to schedule interview. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },

  getRecruiterInterviews: async (): Promise<InterviewSchedule[]> => {
    try {
      console.log('Fetching recruiter interviews...');
      const response = await api.get<InterviewSchedule[]>('/interviews/recruiter');
      console.log('Recruiter interviews fetched:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching recruiter interviews:', error);
      toast({
        title: "Error",
        description: "Failed to load interviews. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },

  getStudentInterviews: async (): Promise<InterviewSchedule[]> => {
    try {
      console.log('Fetching student interviews...');
      const response = await api.get<InterviewSchedule[]>('/interviews/student');
      console.log('Student interviews fetched:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching student interviews:', error);
      toast({
        title: "Error",
        description: "Failed to load interviews. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },

  updateInterviewStatus: async (interviewId: string, status: InterviewSchedule['status']): Promise<InterviewSchedule> => {
    try {
      console.log(`Updating interview ${interviewId} status to ${status}`);
      const response = await api.put<InterviewSchedule>(`/interviews/${interviewId}/status`, { status });
      console.log('Interview status updated:', response.data);
      toast({
        title: "Status Updated",
        description: `Interview status updated to ${status}.`,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating interview status:', error);
      toast({
        title: "Error",
        description: "Failed to update interview status. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  rescheduleInterview: async (interviewId: string, newDate: string, newTime: string): Promise<InterviewSchedule> => {
    try {
      console.log(`Rescheduling interview ${interviewId} to ${newDate} ${newTime}`);
      const response = await api.put<InterviewSchedule>(`/interviews/${interviewId}/reschedule`, { 
        date: newDate, 
        time: newTime 
      });
      console.log('Interview rescheduled:', response.data);
      toast({
        title: "Interview Rescheduled",
        description: "Interview has been rescheduled successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to reschedule interview. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }
};

export default interviewService;
