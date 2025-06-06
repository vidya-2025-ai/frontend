
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Mail, Download, Calendar, FileText, Loader2, Eye, Briefcase } from 'lucide-react';
import applicationService from '@/services/api/applicationService';
import { useToast } from '@/hooks/use-toast';
import { Application } from '@/services/api/types';
import ApplicationStatusUpdate from '@/components/recruiter/ApplicationStatusUpdate';

const Applications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 20,
    sortBy: 'appliedDate',
    sortOrder: 'desc' as 'asc' | 'desc',
    search: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch applications based on filters
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['recruiter-applications', filters, activeTab],
    queryFn: () => {
      const updatedFilters = {
        ...filters,
        status: activeTab === 'all' ? '' : activeTab
      };
      return applicationService.getRecruiterApplications(updatedFilters);
    },
  });
  
  // Update application status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string, status: string }) => 
      applicationService.updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-applications'] });
      toast({
        title: "Success",
        description: "Application status updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  });
  
  // Update filters when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFilters(prev => ({
      ...prev,
      status: value === 'all' ? '' : value,
      page: 1
    }));
  };
  
  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Get class for application status badge
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Shortlisted':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleViewApplication = (application: Application) => {
    if (application.opportunity && typeof application.opportunity === 'object') {
      navigate(`/recruiter/applications/${application.opportunity.id || application.opportunity._id}`);
    }
  };

  const handleStatusUpdate = (updatedApplication: Application) => {
    queryClient.invalidateQueries({ queryKey: ['recruiter-applications'] });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 border-transparent focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search applications..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button
                variant="outline"
                className="ml-3"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                className="ml-3"
                onClick={() => {
                  toast({
                    title: "Export Started",
                    description: "Generating export file..."
                  });
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Applications</h1>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={filters.sortBy}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appliedDate">Application Date</SelectItem>
                        <SelectItem value="lastUpdated">Last Updated</SelectItem>
                        <SelectItem value="skillMatch">Skill Match</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid grid-cols-7 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Under Review">Under Review</TabsTrigger>
                    <TabsTrigger value="Shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="Interview">Interview</TabsTrigger>
                    <TabsTrigger value="Accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    {isLoading ?  (
                      <div className="text-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-gray-500 dark:text-gray-400">Loading applications...</p>
                      </div>
                    ) : isError ? (
                      <div className="text-center py-10">
                        <p className="text-red-500">Error loading applications</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => refetch()}
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : applications && applications.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No applications found</p>
                      </div>
                    ) : (Array.isArray(applications) &&
                      applications.map((application: Application) => (
                        <Card key={application.id || application._id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row lg:items-center p-4 lg:p-6">
                              <div className="flex items-center mb-4 lg:mb-0 flex-1">
                                <Avatar className="h-10 w-10 mr-4">
                                  {application.student && typeof application.student !== 'string' && application.student.avatar ? (
                                    <AvatarImage src={application.student.avatar} alt={application.student.firstName} />
                                  ) : (
                                    <AvatarFallback>
                                      {typeof application.student !== 'string' ? 
                                        `${application.student?.firstName?.charAt(0) || ''}${application.student?.lastName?.charAt(0) || ''}` : 
                                        'U'}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {typeof application.student !== 'string' ? 
                                      `${application.student?.firstName || ''} ${application.student?.lastName || ''}` : 
                                      'Unknown Candidate'}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    {typeof application.opportunity !== 'string' ? (
                                      <span>{application.opportunity?.title || 'Unknown Position'}</span>
                                    ) : (
                                      <span>Unknown Position</span>
                                    )}
                                    <span className="mx-2">•</span>
                                    <span>Applied {formatDate(application.appliedDate.toString())}</span>
                                  </div>
                                  {typeof application.student !== 'string' && application.student?.email && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      {application.student.email}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 mt-3 lg:mt-0 lg:ml-4">
                                <ApplicationStatusUpdate
                                  application={application}
                                  onStatusUpdated={handleStatusUpdate}
                                  variant="compact"
                                />
                                
                                {application.interviewDate && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {formatDate(application.interviewDate.toString())}
                                    </span>
                                  </Badge>
                                )}
                                
                                {application.resumeUrl && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>Resume</span>
                                  </Badge>
                                )}

                                {application.skillMatch !== undefined && (
                                  <Badge variant="outline">
                                    {application.skillMatch}% Match
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="mt-4 lg:mt-0 lg:ml-4 flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={() => {
                                    if (typeof application.student !== 'string' && application.student?.email) {
                                      window.location.href = `mailto:${application.student.email}`;
                                    }
                                  }}
                                >
                                  <Mail className="h-4 w-4" />
                                  Contact
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleViewApplication(application)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
