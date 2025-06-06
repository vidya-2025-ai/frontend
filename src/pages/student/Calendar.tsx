
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { calendarService } from '@/services/api/calendarService';
import { interviewService } from '@/services/api/interviewService';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Clock, MapPin, Video, User, Calendar as CalendarIcon, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalendarEvent {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  type: string;
  location?: string;
  description?: string;
}

interface InterviewSchedule {
  id?: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  position: string;
  recruiterId: string;
  recruiterName: string;
  date: string;
  time: string;
  duration: number;
  meetingLink?: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  type: 'Technical' | 'HR Round' | 'Final Round' | 'Screening';
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [interviews, setInterviews] = useState<InterviewSchedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching calendar data...');
        
        const [eventsData, interviewsData] = await Promise.all([
          calendarService.getAllEvents(),
          interviewService.getStudentInterviews()
        ]);
        
        console.log('Calendar events received:', eventsData);
        console.log('Interviews received:', interviewsData);
        
        setEvents(eventsData);
        setInterviews(interviewsData);
      } catch (error) {
        console.error('Failed to fetch calendar data:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter interviews and events for the selected date
  const selectedDateString = date.toISOString().split('T')[0];
  const selectedDateInterviews = interviews.filter(interview => 
    interview.date === selectedDateString
  );
  const selectedDateEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate.toISOString().split('T')[0] === selectedDateString;
  });

  // Get all items (interviews + events) for a date for calendar dots
  const getItemsForDate = (checkDate: Date) => {
    const dateString = checkDate.toISOString().split('T')[0];
    const dayInterviews = interviews.filter(interview => interview.date === dateString);
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toISOString().split('T')[0] === dateString;
    });
    return [...dayInterviews, ...dayEvents];
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Confirmed':
      case 'Scheduled':
        return 'default';
      case 'Completed':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'interview':
      case 'technical':
      case 'hr round':
      case 'final round':
      case 'screening':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      case 'meeting':
        return 'bg-amber-500';
      case 'event':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleJoinMeeting = (interview: InterviewSchedule) => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
    } else {
      toast({
        title: "No Meeting Link",
        description: "Meeting link will be provided closer to the interview time.",
        variant: "default",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">My Schedule</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-96 w-full" />
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-8 w-48" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-20 w-full" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search schedule..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="ml-3 relative">
                <Avatar>
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">My Schedule</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    View your interviews and events
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border"
                      components={{
                        DayContent: (props) => {
                          const itemsForDay = getItemsForDate(props.date);
                          return (
                            <div className="relative w-full h-full flex items-center justify-center">
                              {props.date.getDate()}
                              {itemsForDay.length > 0 && (
                                <div className="absolute bottom-1 flex gap-1 justify-center">
                                  {itemsForDay.slice(0, 3).map((_, i) => (
                                    <span 
                                      key={i} 
                                      className="inline-block w-1 h-1 rounded-full bg-blue-500"
                                    ></span>
                                  ))}
                                  {itemsForDay.length > 3 && (
                                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }
                      }}
                    />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        {format(date, 'EEEE, MMMM d, yyyy')}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Badge className="mr-2">{selectedDateInterviews.length}</Badge>
                        Interviews
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Badge className="mr-2">{selectedDateEvents.length}</Badge>
                        Events
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <Tabs defaultValue="interviews" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="interviews">Interviews</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="interviews">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium text-gray-900">
                            My Interviews
                          </h2>
                          <p className="text-sm text-gray-600">
                            {format(date, 'MMM d, yyyy')}
                          </p>
                        </div>
                        
                        {selectedDateInterviews.length === 0 ? (
                          <div className="text-center py-8">
                            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No interviews scheduled for this date.</p>
                          </div>
                        ) : (
                          selectedDateInterviews.map((interview) => (
                            <Card key={interview.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                      <AvatarFallback>
                                        {interview.recruiterName?.split(' ').map(n => n[0]).join('') || 'R'}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-lg font-medium text-gray-900">
                                        {interview.position}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        with {interview.recruiterName || 'Recruiter'}
                                      </p>
                                      <div className="flex items-center mt-2 space-x-4">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                          <span className="text-sm text-gray-600">
                                            {interview.time} ({interview.duration} min)
                                          </span>
                                        </div>
                                        <div className="flex items-center">
                                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                          <span className="text-sm text-gray-600">
                                            {interview.location || 'Video Call'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge variant={getStatusBadgeVariant(interview.status)}>
                                      {interview.status}
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800">
                                      {interview.type}
                                    </Badge>
                                  </div>
                                </div>
                                
                                {interview.notes && (
                                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                      <strong>Notes:</strong> {interview.notes}
                                    </p>
                                  </div>
                                )}
                                
                                <div className="mt-4 flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleJoinMeeting(interview)}
                                    className="flex items-center gap-2"
                                  >
                                    <Video className="h-4 w-4" />
                                    {interview.meetingLink ? 'Join Interview' : 'Awaiting Link'}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="events">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium text-gray-900">
                            My Events
                          </h2>
                          <p className="text-sm text-gray-600">
                            {format(date, 'MMM d, yyyy')}
                          </p>
                        </div>
                        
                        {selectedDateEvents.length === 0 ? (
                          <div className="text-center py-8">
                            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No events scheduled for this date.</p>
                          </div>
                        ) : (
                          selectedDateEvents.map((event) => (
                            <Card key={event._id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-full ${getEventTypeColor(event.type)} flex items-center justify-center`}>
                                      <CalendarIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-medium text-gray-900">
                                        {event.title}
                                      </h3>
                                      <div className="flex items-center mt-2 space-x-4">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                          <span className="text-sm text-gray-600">
                                            {format(new Date(event.startDate), 'h:mm a')}
                                          </span>
                                        </div>
                                        {event.location && (
                                          <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                              {event.location}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      {event.description && (
                                        <p className="text-sm text-gray-600 mt-2">
                                          {event.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge className={`${getEventTypeColor(event.type)} text-white`}>
                                      {event.type}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
