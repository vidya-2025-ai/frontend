
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, Video, Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { interviewService, InterviewSchedule } from '@/services/api/interviewService';
import { eventService, EventData } from '@/services/api/eventService';

const StudentSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Fetch interviews
  const { data: interviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ['student-interviews'],
    queryFn: () => interviewService.getStudentInterviews(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['student-events'],
    queryFn: () => eventService.getStudentEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleJoinMeeting = (interview: InterviewSchedule) => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
    }
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

  // Filter interviews and events for selected date
  const selectedDateString = date?.toISOString().split('T')[0];
  const todaysInterviews = interviews?.filter(interview => 
    interview.date === selectedDateString
  ) || [];
  const todaysEvents = events?.filter(event => 
    event.date === selectedDateString
  ) || [];

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search schedule..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Schedule</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    View your upcoming interviews and events
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Calendar</h2>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow pointer-events-auto"
                    />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selected: {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Badge className="mr-2">{todaysInterviews.length}</Badge>
                        Interviews scheduled
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Badge className="mr-2">{todaysEvents.length}</Badge>
                        Events to attend
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <Tabs defaultValue="interviews" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="interviews">My Interviews</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="interviews">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Upcoming Interviews
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {date?.toLocaleDateString()}
                          </p>
                        </div>
                        
                        {interviewsLoading ? (
                          <LoadingSkeleton />
                        ) : todaysInterviews.length === 0 ? (
                          <div className="text-center py-8">
                            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No interviews scheduled for this date.</p>
                          </div>
                        ) : (
                          todaysInterviews.map((interview) => (
                            <Card key={interview.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center space-x-3">
                                    <Avatar>
                                      <AvatarFallback>
                                        <User className="h-4 w-4" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium text-gray-900 dark:text-white">
                                        {interview.position}
                                      </h3>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        with {interview.recruiterName || 'Recruiter'}
                                      </p>
                                      <div className="flex items-center mt-1 space-x-4">
                                        <div className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {interview.time} ({interview.duration}min)
                                          </span>
                                        </div>
                                        {interview.location && (
                                          <div className="flex items-center">
                                            <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                              {interview.location}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge variant={getStatusBadgeVariant(interview.status)}>
                                      {interview.status}
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                      {interview.type}
                                    </Badge>
                                  </div>
                                </div>
                                {interview.notes && (
                                  <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      <strong>Notes:</strong> {interview.notes}
                                    </p>
                                  </div>
                                )}
                                <div className="mt-4 flex justify-end gap-2">
                                  {interview.meetingLink ? (
                                    <Button 
                                      size="sm" 
                                      className="flex items-center gap-1"
                                      onClick={() => handleJoinMeeting(interview)}
                                    >
                                      <Video className="h-4 w-4" />
                                      Join Interview
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="outline" disabled>
                                      Meeting link not provided
                                    </Button>
                                  )}
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
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Events & Activities
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {date?.toLocaleDateString()}
                          </p>
                        </div>
                        
                        {eventsLoading ? (
                          <LoadingSkeleton />
                        ) : todaysEvents.length === 0 ? (
                          <div className="text-center py-8">
                            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No events scheduled for this date.</p>
                          </div>
                        ) : (
                          todaysEvents.map((event) => (
                            <Card key={event.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                      {event.title}
                                    </h3>
                                    <div className="flex items-center mt-1 space-x-4">
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {event.time}
                                        </span>
                                      </div>
                                      {event.location && (
                                        <div className="flex items-center">
                                          <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {event.location}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {event.description && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {event.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge variant={getStatusBadgeVariant(event.status)}>
                                      {event.status}
                                    </Badge>
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                      {event.type}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                  {event.meetingLink ? (
                                    <Button 
                                      size="sm" 
                                      className="flex items-center gap-1"
                                      onClick={() => window.open(event.meetingLink, '_blank')}
                                    >
                                      <Video className="h-4 w-4" />
                                      Join Event
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="outline">
                                      View Details
                                    </Button>
                                  )}
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

export default StudentSchedule;
