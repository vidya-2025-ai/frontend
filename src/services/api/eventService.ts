
import api from './index';
import { toast } from '@/components/ui/use-toast';

export interface EventData {
  id?: string;
  title: string;
  date: string;
  time: string;
  type: 'Interview' | 'Challenge' | 'Mentorship' | 'Workshop' | 'Webinar' | 'Deadline' | 'Meeting' | 'Other';
  description?: string;
  location?: string;
  duration?: number; // in minutes
  participants?: string[];
  organizerId?: string;
  organizerName?: string;
  relatedTo?: string; // ID of related entity (opportunity, challenge, etc.)
  relatedType?: 'Opportunity' | 'Challenge' | 'Mentorship' | 'Application';
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  meetingLink?: string;
  isRecurring?: boolean;
  recurringPattern?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const eventService = {
  createEvent: async (eventData: Omit<EventData, 'id'>): Promise<EventData> => {
    try {
      console.log('Creating event:', eventData);
      const response = await api.post<EventData>('/events', eventData);
      console.log('Event created:', response.data);
      toast({
        title: "Event Created",
        description: `${eventData.title} has been scheduled successfully.`,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating event:', error);
      const errorMessage = error.response?.data?.message || "Failed to create event. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },

  getRecruiterEvents: async (): Promise<EventData[]> => {
    try {
      console.log('Fetching recruiter events...');
      const response = await api.get<EventData[]>('/events/recruiter');
      console.log('Recruiter events fetched:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching recruiter events:', error);
      return [];
    }
  },

  getStudentEvents: async (): Promise<EventData[]> => {
    try {
      console.log('Fetching student events...');
      const response = await api.get<EventData[]>('/events/student');
      console.log('Student events fetched:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching student events:', error);
      return [];
    }
  },

  updateEvent: async (eventId: string, eventData: Partial<EventData>): Promise<EventData> => {
    try {
      console.log(`Updating event ${eventId}:`, eventData);
      const response = await api.put<EventData>(`/events/${eventId}`, eventData);
      console.log('Event updated:', response.data);
      toast({
        title: "Event Updated",
        description: "Event has been updated successfully.",
      });
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  deleteEvent: async (eventId: string): Promise<void> => {
    try {
      console.log(`Deleting event ${eventId}`);
      await api.delete(`/events/${eventId}`);
      console.log('Event deleted successfully');
      toast({
        title: "Event Deleted",
        description: "Event has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }
};

export default eventService;
