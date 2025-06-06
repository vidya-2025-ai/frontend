import api from './index';
import { toast } from '@/components/ui/use-toast';

export interface CalendarEvent {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  type: string;
  location?: string;
  description?: string;
}

// Backend event structure
interface BackendEvent {
  id?: string;
  _id?: string;
  title: string;
  date: string;
  time?: string;
  type: string;
  location?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Backend interview structure
interface BackendInterview {
  id?: string;
  _id?: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  position: string;
  recruiterId: string;
  recruiterName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  location?: string;
  meetingLink?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface EventStatistics {
  totalEvents: number;
  upcomingEvents: number;
  eventsByType: {
    type: string;
    count: number;
  }[];
  eventsByMonth: {
    month: string;
    count: number;
  }[];
}

export const calendarService = {
  getAllEvents: async (filters: EventFilters = {}): Promise<CalendarEvent[]> => {
    try {
      console.log('Fetching all events for student calendar...');
      
      // Fetch both events and interviews
      const [eventsResponse, interviewsResponse] = await Promise.all([
        api.get<BackendEvent[]>('/events/student'),
        api.get<BackendInterview[]>('/interviews/student')
      ]);
      
      // Transform events
      const events = Array.isArray(eventsResponse.data) ? eventsResponse.data : [];
      const calendarEvents = events.map(event => ({
        _id: event.id || event._id || '',
        title: event.title,
        startDate: event.date + 'T' + (event.time || '00:00'),
        endDate: event.date + 'T' + (event.time || '00:00'),
        type: event.type,
        location: event.location,
        description: event.description
      }));

      // Transform interviews to calendar events
      const interviews = Array.isArray(interviewsResponse.data) ? interviewsResponse.data : [];
      const interviewEvents = interviews.map(interview => ({
        _id: `interview_${interview.id || interview._id}`,
        title: `Interview: ${interview.position}`,
        startDate: interview.date + 'T' + interview.time,
        endDate: interview.date + 'T' + interview.time,
        type: 'Interview',
        location: interview.location || 'Video Call',
        description: `${interview.type} interview with ${interview.recruiterName}. Duration: ${interview.duration} minutes.${interview.notes ? ' Notes: ' + interview.notes : ''}`
      }));

      // Combine and return all events
      const allEvents = [...calendarEvents, ...interviewEvents];
      console.log(`Found ${allEvents.length} total events (${calendarEvents.length} events + ${interviewEvents.length} interviews)`);
      return allEvents;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar events",
        variant: "destructive",
      });
      return [];
    }
  },
  
  getRecruiterEvents: async (filters: EventFilters = {}): Promise<CalendarEvent[]> => {
    try {
      console.log('Fetching recruiter events for calendar...');
      
      // Fetch both events and interviews for recruiters
      const [eventsResponse, interviewsResponse] = await Promise.all([
        api.get<BackendEvent[]>('/events/recruiter'),
        api.get<BackendInterview[]>('/interviews/recruiter')
      ]);
      
      // Transform events
      const events = Array.isArray(eventsResponse.data) ? eventsResponse.data : [];
      const calendarEvents = events.map(event => ({
        _id: event.id || event._id || '',
        title: event.title,
        startDate: event.date + 'T' + (event.time || '00:00'),
        endDate: event.date + 'T' + (event.time || '00:00'),
        type: event.type,
        location: event.location,
        description: event.description
      }));

      // Transform interviews to calendar events
      const interviews = Array.isArray(interviewsResponse.data) ? interviewsResponse.data : [];
      const interviewEvents = interviews.map(interview => ({
        _id: `interview_${interview.id || interview._id}`,
        title: `Interview: ${interview.candidateName}`,
        startDate: interview.date + 'T' + interview.time,
        endDate: interview.date + 'T' + interview.time,
        type: 'Interview',
        location: interview.location || 'Video Call',
        description: `${interview.type} interview for ${interview.position}. Duration: ${interview.duration} minutes.`
      }));

      // Combine and return all events
      return [...calendarEvents, ...interviewEvents];
    } catch (error) {
      console.error('Error fetching recruiter calendar events:', error);
      return [];
    }
  },
  
  getEventById: async (id: string): Promise<CalendarEvent> => {
    const response = await api.get<CalendarEvent>(`/events/${id}`);
    return response.data;
  },
  
  createEvent: async (eventData: any): Promise<CalendarEvent> => {
    const response = await api.post<CalendarEvent>('/events', eventData);
    return response.data;
  },
  
  updateEvent: async (id: string, eventData: any): Promise<CalendarEvent> => {
    const response = await api.put<CalendarEvent>(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete<void>(`/events/${id}`);
  },
  
  getEventStatistics: async (): Promise<EventStatistics> => {
    const response = await api.get<EventStatistics>('/events/statistics');
    return response.data;
  },
  
  getRecentEvents: async (limit: number = 5): Promise<CalendarEvent[]> => {
    const response = await api.get<CalendarEvent[]>('/events/recent', { 
      params: { limit } 
    });
    return response.data;
  }
};

export default calendarService;
