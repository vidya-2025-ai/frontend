
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Briefcase, 
  Users,
  Calendar, 
  Eye,
  Download,
  Loader2
} from "lucide-react";
import { applicationService } from "@/services/api/applicationService";
import { opportunityService } from "@/services/api/opportunityService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Application, User, Opportunity } from '@/services/api/types';

const ApplicationsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Helper functions for type safety
  const getStudentFirstName = (student: string | User): string => {
    if (typeof student === 'object' && student !== null) {
      return student.firstName || '';
    }
    return '';
  };

  const getStudentLastName = (student: string | User): string => {
    if (typeof student === 'object' && student !== null) {
      return student.lastName || '';
    }
    return '';
  };

  const getStudentEmail = (student: string | User): string => {
    if (typeof student === 'object' && student !== null) {
      return student.email || '';
    }
    return '';
  };

  const getStudentSkills = (student: string | User): string[] => {
    if (typeof student === 'object' && student !== null) {
      return student.skills || [];
    }
    return [];
  };

  // Get opportunity details
  const { 
    data: opportunity, 
    isLoading: loadingOpportunity
  } = useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => id ? opportunityService.getOpportunityById(id) : Promise.reject('No opportunity ID'),
    enabled: !!id
  });

  // Get applications for this opportunity
  const { 
    data: applications = [], 
    isLoading: loadingApplications
  } = useQuery({
    queryKey: ['applications', id, activeTab],
    queryFn: () => {
      if (!id) return Promise.reject('No opportunity ID');
      const filters = activeTab !== 'all' ? { status: activeTab } : {};
      return opportunityService.getCandidates(id, filters);
    },
    enabled: !!id
  });

  // Get details of selected application
  const { 
    data: selectedApplication,
    isLoading: loadingSelectedApplication
  } = useQuery({
    queryKey: ['application', selectedApplicationId],
    queryFn: () => selectedApplicationId 
      ? applicationService.getApplicationDetails(selectedApplicationId)
      : Promise.reject('No application selected'),
    enabled: !!selectedApplicationId
  });

  const viewApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setViewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Interview':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => navigate('/recruiter/Applications')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
            </Button>

            {loadingOpportunity ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ) : opportunity ? (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Applications for: {opportunity.title}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {opportunity.type}
                  </div>
                  {opportunity.applications && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      {opportunity.applications.length} applications
                    </div>
                  )}
                  {opportunity.deadline && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {formatDate(opportunity.deadline)}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-red-50 rounded-lg mb-6">
                <p className="text-red-600">Failed to load opportunity details</p>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Under Review">Under Review</TabsTrigger>
                    <TabsTrigger value="Shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="Interview">Interview</TabsTrigger>
                    <TabsTrigger value="Accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab}>
                    {loadingApplications ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : applications.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No applications found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Applicant</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Applied On</TableHead>
                              <TableHead>Skill Match</TableHead>
                              <TableHead>Resume</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {applications.map((application: Application) => (
                              <TableRow key={application.id}>
                                <TableCell className="font-medium">
                                  {getStudentFirstName(application.student)} {getStudentLastName(application.student)}
                                  <div className="text-xs text-gray-500">{getStudentEmail(application.student)}</div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(application.status)}>
                                    {application.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{formatDate(application.appliedAt)}</TableCell>
                                <TableCell>
                                  {application.skillMatch ? (
                                    <div className="flex items-center">
                                      <span>{application.skillMatch}%</span>
                                      <div className="ml-2 bg-gray-200 dark:bg-gray-700 w-24 h-2 rounded-full overflow-hidden">
                                        <div 
                                          className="bg-green-500 h-2 rounded-full"
                                          style={{ width: `${application.skillMatch}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {application.resumeUrl ? (
                                    <Button variant="outline" size="sm" 
                                      onClick={() => window.open(application.resumeUrl, '_blank')}
                                    >
                                      <Download className="h-4 w-4 mr-1" />
                                      Resume
                                    </Button>
                                  ) : (
                                    <span className="text-gray-500">No resume</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => viewApplication(application.id!)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          {loadingSelectedApplication ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3 mb-2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : selectedApplication ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    {getStudentFirstName(selectedApplication.student)} {getStudentLastName(selectedApplication.student)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{getStudentEmail(selectedApplication.student)}</p>
                </div>
                <div>
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    {selectedApplication.status}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied on {formatDate(selectedApplication.appliedAt)}
                  </p>
                </div>
              </div>

              {selectedApplication.resumeUrl && (
                <div>
                  <h4 className="font-medium mb-2">Resume</h4>
                  <Button variant="outline" onClick={() => window.open(selectedApplication.resumeUrl, '_blank')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              )}

              {selectedApplication.coverLetter && (
                <div>
                  <h4 className="font-medium mb-2">Cover Letter</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <p className="whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                  </div>
                </div>
              )}

              {getStudentSkills(selectedApplication.student).length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {getStudentSkills(selectedApplication.student).map((skill: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedApplication.skillMatch !== undefined && (
                <div>
                  <h4 className="font-medium mb-2">Skill Match</h4>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">{selectedApplication.skillMatch}%</span>
                    <div className="ml-3 bg-gray-200 dark:bg-gray-700 w-full h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${selectedApplication.skillMatch}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Failed to load application details</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsView;
