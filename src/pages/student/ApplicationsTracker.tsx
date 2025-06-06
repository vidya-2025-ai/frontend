
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileText, Activity, TrendingUp, Calendar, Filter, ArrowLeft } from 'lucide-react';
import { applicationService } from '@/services/api/applicationService';
import { Application } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';

const ApplicationsTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch applications data
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['student-applications-tracker'],
    queryFn: applicationService.getStudentApplications,
  });

  // Process application data for charts
  const processApplicationData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    
    // Last 6 months data
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[date.getMonth()];
      
      const monthApplications = applications.filter(app => {
        const appDate = new Date(app.appliedDate);
        return appDate.getMonth() === date.getMonth() && appDate.getFullYear() === date.getFullYear();
      });

      monthlyData.push({
        month: monthName,
        applications: monthApplications.length,
        accepted: monthApplications.filter(app => app.status === 'Accepted').length,
        rejected: monthApplications.filter(app => app.status === 'Rejected').length,
        pending: monthApplications.filter(app => app.status === 'Pending').length,
      });
    }

    // Status distribution
    const statusData = [
      { name: 'Pending', value: applications.filter(app => app.status === 'Pending').length, color: '#8884d8' },
      { name: 'Under Review', value: applications.filter(app => app.status === 'Under Review').length, color: '#82ca9d' },
      { name: 'Shortlisted', value: applications.filter(app => app.status === 'Shortlisted').length, color: '#ffc658' },
      { name: 'Interview', value: applications.filter(app => app.status === 'Interview').length, color: '#ff7300' },
      { name: 'Accepted', value: applications.filter(app => app.status === 'Accepted').length, color: '#00ff00' },
      { name: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length, color: '#ff0000' },
    ].filter(item => item.value > 0);

    return { monthlyData, statusData };
  };

  const { monthlyData, statusData } = processApplicationData();

  // Recent activities
  const recentActivities = applications
    .flatMap(app => {
      const activities = [];
      
      // Application submitted
      activities.push({
        id: `${app._id}-submit`,
        type: 'Application Submitted',
        opportunity: typeof app.opportunity === 'string' ? 'Opportunity' : app.opportunity?.title || 'Opportunity',
        date: app.appliedDate,
        status: 'submitted'
      });

      // Status updates from activities array
      if (app.activities) {
        app.activities.forEach((activity, idx) => {
          activities.push({
            id: `${app._id}-${idx}`,
            type: activity.type,
            opportunity: typeof app.opportunity === 'string' ? 'Opportunity' : app.opportunity?.title || 'Opportunity',
            date: activity.date,
            status: 'updated'
          });
        });
      }

      return activities;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'updated': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/student/applications')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Applications
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applications & Activity Tracker</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Track your application progress and analyze your job search activity
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Applications
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{applications.length}</p>
                        </div>
                        <FileText className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {monthlyData[monthlyData.length - 1]?.applications || 0}
                          </p>
                        </div>
                        <Calendar className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accepted</p>
                          <p className="text-2xl font-bold text-green-600">
                            {applications.filter(app => app.status === 'Accepted').length}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {applications.length > 0 
                              ? Math.round((applications.filter(app => app.status === 'Accepted').length / applications.length) * 100)
                              : 0}%
                          </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Trends (Last 6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {isLoading ? (
                          <Skeleton className="h-full w-full" />
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line 
                                type="monotone" 
                                dataKey="applications" 
                                stroke="#8884d8" 
                                name="Applications"
                                strokeWidth={2}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="accepted" 
                                stroke="#00ff00" 
                                name="Accepted"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {isLoading ? (
                          <Skeleton className="h-full w-full" />
                        ) : statusData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {statusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            No data available
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Application Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      {isLoading ? (
                        <Skeleton className="h-full w-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                            <Bar dataKey="accepted" fill="#00ff00" name="Accepted" />
                            <Bar dataKey="rejected" fill="#ff0000" name="Rejected" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="p-4 rounded-lg border dark:border-gray-700">
                            <div className="flex justify-between items-center">
                              <div>
                                <Skeleton className="h-5 w-36 mb-2" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                              <Skeleton className="h-4 w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : recentActivities.length === 0 ? (
                      <div className="text-center p-8">
                        <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No recent activities found</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Start applying to opportunities to see your activity here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div 
                            key={activity.id}
                            className="flex justify-between items-center p-4 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{activity.type}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.opportunity}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={getStatusColor(activity.status)}>
                                {activity.status}
                              </Badge>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTracker;
