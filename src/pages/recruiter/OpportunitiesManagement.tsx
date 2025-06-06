
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { 
  PlusCircle,
  Calendar,
  Users,
  Eye,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { opportunityService } from "@/services/api/opportunityService";

const OpportunitiesManagement: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");

  // Get recruiter opportunities
  const { 
    data: opportunities = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['recruiter-opportunities', activeTab],
    queryFn: () => opportunityService.getRecruiterOpportunities({ 
      status: activeTab !== 'all' ? activeTab : undefined 
    })
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const viewApplications = (opportunityId: string) => {
    navigate(`/recruiter/applications/${opportunityId}`);
  };

  const viewOpportunity = (opportunityId: string) => {
    navigate(`/recruiter/opportunity/${opportunityId}`);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Opportunities</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Manage your posted internships and job openings
                </p>
              </div>
              <Button onClick={() => navigate('/recruiter/opportunity/create')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Post New Opportunity
              </Button>
            </div>

            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, idx) => (
                      <Card key={idx} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent className="p-4">
                          <Skeleton className="h-24 w-full" />
                        </CardContent>
                        <CardFooter className="p-4 flex justify-between">
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-10 w-24" />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <Card className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800">
                    <CardContent className="p-6 text-center">
                      <p className="text-red-600 dark:text-red-300">
                        Failed to load opportunities. Please try again.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4" 
                        onClick={() => window.location.reload()}
                      >
                        Retry
                      </Button>
                    </CardContent>
                  </Card>
                ) : opportunities.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't posted any opportunities yet. 
                        Create your first opportunity to start receiving applications.
                      </p>
                      <Button onClick={() => navigate('/recruiter/opportunity/create')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Post Opportunity
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {opportunities.map((opportunity: any) => (
                      <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                            <Badge>
                              {opportunity.type || "Internship"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {opportunity.location || "Remote"}
                          </p>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Deadline: {formatDate(opportunity.deadline)}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-gray-500" />
                              <span>
                                {opportunity.applicationStats?.total || 0} 
                                {' '}
                                {(opportunity.applicationStats?.total === 1) ? 'Application' : 'Applications'}
                              </span>
                            </div>
                            
                            {opportunity.applicationStats && (
                              <div className="pt-2">
                                <div className="text-xs text-gray-500 mb-1">Application Status</div>
                                <div className="flex space-x-2">
                                  {opportunity.applicationStats.pending > 0 && (
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                                      {opportunity.applicationStats.pending} Pending
                                    </Badge>
                                  )}
                                  {opportunity.applicationStats.shortlisted > 0 && (
                                    <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                                      {opportunity.applicationStats.shortlisted} Shortlisted
                                    </Badge>
                                  )}
                                  {opportunity.applicationStats.interview > 0 && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                                      {opportunity.applicationStats.interview} Interview
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-4 flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewOpportunity(opportunity.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => viewApplications(opportunity.id)}
                          >
                            View Applications <ArrowRight className="ml-1 h-4 w-4" />
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

export default OpportunitiesManagement;
