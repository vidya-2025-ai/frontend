
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { CalendarDays, File, ArrowUpRight, Loader2, BarChart3 } from 'lucide-react';
import applicationService from '@/services/api/applicationService';

const Applications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  
  // Use React Query to fetch applications
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['student-applications'],
    queryFn: applicationService.getStudentApplications,
    meta: {
      onError: (error) => {
        console.error('Error in useQuery:', error);
        toast({
          title: "Error",
          description: "Failed to load your applications. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  useEffect(() => {
    console.log("Applications component mounted or data changed");
    console.log("Applications data:", applications);
  }, [applications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Filter applications based on active tab
  const getFilteredApplications = () => {
    if (activeTab === 'all') return applications;
    return applications.filter(app => app.status === activeTab);
  };

  const filteredApplications = getFilteredApplications();

  // Calculate application statistics
  const applicationStats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'Pending').length,
    underReview: applications.filter(app => app.status === 'Under Review').length,
    shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
    interview: applications.filter(app => app.status === 'Interview').length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
  };

  const handleViewOpportunity = (opportunityId: string) => {
    console.log("Navigating to opportunity:", opportunityId);
    navigate(`/student/opportunity/${opportunityId}`);
  };

  const getOrganizationName = (opportunity: any) => {
    if (typeof opportunity === 'string') return 'Organization';
    if (opportunity?.organization) {
      if (typeof opportunity.organization === 'string') return opportunity.organization;
      return opportunity.organization.organization || opportunity.organization.firstName + ' ' + opportunity.organization.lastName || 'Organization';
    }
    return 'Organization';
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Applications</h1>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate('/student/applicationstracker')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Activity Tracker
                </Button>
                <Button onClick={() => navigate('/student/explore')}>
                  Explore Opportunities
                </Button>
              </div>
            </div>

            {/* Application Statistics */}
            {!isLoading && applications.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{applicationStats.total}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{applicationStats.pending}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{applicationStats.underReview}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Under Review</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{applicationStats.shortlisted}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Shortlisted</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{applicationStats.interview}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Interview</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{applicationStats.accepted}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accepted</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{applicationStats.rejected}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
                  </div>
                </Card>
              </div>
            )}
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({applicationStats.total})</TabsTrigger>
                <TabsTrigger value="Pending">Pending ({applicationStats.pending})</TabsTrigger>
                <TabsTrigger value="Under Review">Under Review ({applicationStats.underReview})</TabsTrigger>
                <TabsTrigger value="Shortlisted">Shortlisted ({applicationStats.shortlisted})</TabsTrigger>
                <TabsTrigger value="Interview">Interview ({applicationStats.interview})</TabsTrigger>
                <TabsTrigger value="Accepted">Accepted ({applicationStats.accepted})</TabsTrigger>
                <TabsTrigger value="Rejected">Rejected ({applicationStats.rejected})</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading applications...</span>
                  </div>
                ) : isError ? (
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-6">
                      <p className="text-red-600 text-center mb-4">Failed to load your applications</p>
                      <div className="flex justify-center">
                        <Button onClick={() => refetch()}>Try Again</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : filteredApplications.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">No {activeTab !== 'all' ? activeTab.toLowerCase() : ''} applications found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {activeTab === 'all' 
                            ? "You haven't applied to any opportunities yet." 
                            : `You don't have any ${activeTab.toLowerCase()} applications.`}
                        </p>
                        <Button onClick={() => navigate('/student/explore')}>
                          Find Opportunities
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApplications.map((application) => (
                      <Card key={application.id || application._id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold">
                            {application.opportunity && typeof application.opportunity !== 'string' 
                              ? application.opportunity.title 
                              : 'Opportunity Title'}
                          </CardTitle>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getOrganizationName(application.opportunity)}
                          </p>
                        </CardHeader>
                        <CardContent className="pt-2 pb-4">
                          <Badge className={`mb-3 ${getStatusColor(application.status)}`}>
                            {application.status}
                          </Badge>
                          
                          <div className="flex items-center text-xs text-gray-500 mt-3">
                            <CalendarDays className="h-3.5 w-3.5 mr-1" />
                            <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                          
                          {application.opportunity && typeof application.opportunity !== 'string' && application.opportunity.type && (
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">
                                {application.opportunity.type}
                              </span>
                              <span className="text-xs text-gray-500">
                                {application.opportunity.location || 'Remote'}
                              </span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-0 gap-2">
                          {application.resumeUrl && (
                            <Button variant="outline" size="sm" className="text-xs" asChild>
                              <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <File className="h-3.5 w-3.5 mr-1" /> View Resume
                              </a>
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            className="text-xs ml-auto" 
                            onClick={() => {
                              if (application.opportunity && typeof application.opportunity !== 'string') {
                                const oppId = application.opportunity.id || application.opportunity._id;
                                handleViewOpportunity(oppId);
                              }
                            }}
                          >
                            View Opportunity <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
