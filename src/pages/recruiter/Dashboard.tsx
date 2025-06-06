
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Mail, CalendarDays, Users, TrendingUp, BookOpen, BarChart2 } from "lucide-react";
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import dashboardService from '@/services/api/dashboardService';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  
  // Fetch dashboard statistics
  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardService.getRecruiterStats,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Could not load dashboard statistics",
          variant: "destructive"
        });
      }
    }
  });

  // Fetch recent applications
  const {
    data: recentApplications,
    isLoading: applicationsLoading,
    error: applicationsError
  } = useQuery({
    queryKey: ['recentApplications'],
    queryFn: () => dashboardService.getRecentApplications(5),
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Could not load recent applications",
          variant: "destructive"
        });
      }
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Overview of your recruitment activities
            </p>
          </div>
          
          {/* Stats Section */}
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900 mr-4">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {statsLoading ? '...' : statsError ? 'Error' : dashboardStats?.activeJobs || 0}
                  </h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900 mr-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {statsLoading ? '...' : statsError ? 'Error' : dashboardStats?.totalApplications || 0}
                  </h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900 mr-4">
                  <CalendarDays className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Interviews Scheduled</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {statsLoading ? '...' : statsError ? 'Error' : dashboardStats?.interviewsScheduled || 0}
                  </h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900 mr-4">
                  <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mentorship Matches</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {statsLoading ? '...' : statsError ? 'Error' : dashboardStats?.mentorshipMatches || 0}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Applications */}
          <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Recent Applications</CardTitle>
                <CardDescription>
                  Latest candidates who applied to your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {applicationsLoading ? (
                    <div className="py-4 text-center text-gray-500">Loading applications...</div>
                  ) : applicationsError ? (
                    <div className="py-4 text-center text-red-500">Error loading applications</div>
                  ) : recentApplications?.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">No recent applications</div>
                  ) : (
                    <div className="space-y-4">
                      {recentApplications?.map((application: any, index: number) => (
                        <div key={application._id || index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              {application.student && application.student.avatar ? (
                                <AvatarImage src={application.student.avatar} />
                              ) : (
                                <AvatarFallback>
                                  {application.student ? getInitials(`${application.student.firstName} ${application.student.lastName}`) : 'U'}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {application.student ? `${application.student.firstName} ${application.student.lastName}` : 'Unknown Applicant'}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Applied for {application.opportunity ? application.opportunity.title : 'Unknown Position'}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {formatDate(application.appliedDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className={`mr-3 ${
                              application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              application.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              application.status === 'Interview' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                              application.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              application.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                            }`}>
                              {application.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                              asChild
                            >
                              <a href={`/recruiter/applications/${application._id}`}>
                                <Mail className="h-3 w-3" />
                                <span className="sr-only sm:not-sr-only sm:ml-1 text-xs">Review</span>
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <a href="/recruiter/applications">View All Applications</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Activity Summary</CardTitle>
                <CardDescription>
                  Your recent engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Listings Performance</h4>
                      <BarChart2 className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Views</span>
                          <span className="font-medium text-gray-900 dark:text-white">842</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Applications</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {statsLoading ? '...' : statsError ? 'Error' : dashboardStats?.totalApplications || 0}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Interview Rate</span>
                          <span className="font-medium text-gray-900 dark:text-white">32%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Upcoming Tasks</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-1 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Review pending applications</p>
                          <p className="text-xs text-gray-500">Today</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-1 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Schedule interviews</p>
                          <p className="text-xs text-gray-500">Tomorrow</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300 mt-1 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Post new internship opening</p>
                          <p className="text-xs text-gray-500">This week</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">View All Tasks</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Links */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <a href="/recruiter/post-internship">
                    <Briefcase className="h-5 w-5 mb-2" />
                    <span>Post New Job</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <a href="/recruiter/candidates">
                    <Users className="h-5 w-5 mb-2" />
                    <span>Browse Candidates</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <a href="/recruiter/applications">
                    <Mail className="h-5 w-5 mb-2" />
                    <span>Review Applications</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <a href="/recruiter/mentorship">
                    <BookOpen className="h-5 w-5 mb-2" />
                    <span>Mentorship</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
