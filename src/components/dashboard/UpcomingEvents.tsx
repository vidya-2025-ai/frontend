
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { CalendarIcon, Clock, Users, Video } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Mentor Session with Rajesh Kumar',
    date: 'Apr 10, 2025',
    time: '3:00 PM - 4:00 PM',
    type: 'Mentorship',
    typeIcon: Users,
    typeColor: 'text-vs-purple-600'
  },
  {
    id: 2,
    title: 'Project Submission Deadline',
    date: 'Apr 15, 2025',
    time: '11:59 PM',
    type: 'Deadline',
    typeIcon: Clock,
    typeColor: 'text-vs-orange-500'
  },
  {
    id: 3,
    title: 'Webinar: Climate Tech Innovations',
    date: 'Apr 18, 2025',
    time: '5:00 PM - 6:30 PM',
    type: 'Webinar',
    typeIcon: Video,
    typeColor: 'text-blue-600'
  }
];

const UpcomingEvents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
        <a href="/student/calendar" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
          View Calendar
        </a>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="vs-card">
            <CardContent className="p-4">
              <div className="flex">
                <div className="flex-shrink-0 flex flex-col items-center justify-center mr-4 bg-gray-50 rounded-lg p-2 w-14">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-xs font-medium text-gray-900">
                    {event.date.split(',')[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <event.typeIcon className={`h-4 w-4 mr-1 ${event.typeColor}`} />
                    <span className={`text-xs font-medium ${event.typeColor}`}>
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mt-1">{event.title}</h3>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
