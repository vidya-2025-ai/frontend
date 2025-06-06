import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import BackButton from '@/components/ui/back-button';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const activityData = [
  { month: 'Jan', applications: 4, interviews: 2 },
  { month: 'Feb', applications: 6, interviews: 3 },
  { month: 'Mar', applications: 8, interviews: 4 },
  { month: 'Apr', applications: 5, interviews: 2 },
];

const activities = [
  {
    id: 1,
    type: "Application Submitted",
    opportunity: "Summer Research Internship",
    date: "2025-04-22",
  },
  {
    id: 2,
    type: "Interview Scheduled",
    opportunity: "Teaching Assistant Program",
    date: "2025-04-24",
  },
  {
    id: 3,
    type: "Application Status Updated",
    opportunity: "Social Impact Fellowship",
    date: "2025-04-23",
  }
];

const ActivityTracker = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-4">
              <BackButton to="/student/dashboard" />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Activity Tracker</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor your progress and activities
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Activity Overview</h3>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="applications" 
                          stroke="#8884d8" 
                          name="Applications"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="interviews" 
                          stroke="#82ca9d" 
                          name="Interviews"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Recent Activities</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex justify-between items-center p-4 rounded-lg bg-white border"
                      >
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-gray-600">{activity.opportunity}</p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
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
};

export default ActivityTracker;
