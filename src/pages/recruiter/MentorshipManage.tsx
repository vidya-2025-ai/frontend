
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';
import mentorshipService from '@/services/api/mentorshipService';
import { MentorshipRequest } from '@/services/api/types';
import { useToast } from '@/hooks/use-toast';
import CreateProgramDialog from '@/components/mentorship/CreateProgramDialog';

const Mentorship = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: mentorshipStats, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['mentorshipStats'],
    queryFn: mentorshipService.getMentorshipStats,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load mentorship statistics",
            variant: "destructive"
          });
        }
      }
    }
  });
  
  const { data: mentorships, isLoading, isError, refetch } = useQuery({
    queryKey: ['mentorships', selectedTab],
    queryFn: () => mentorshipService.getMyMentorships({ status: selectedTab === 'all' ? undefined : selectedTab }),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load mentorship requests",
            variant: "destructive"
          });
        }
      }
    }
  });
  
  const filteredMentorships = mentorships?.filter(mentorship => {
    if (!searchTerm) return true;
    
    const studentName = typeof mentorship.student === 'string' 
      ? ''
      : `${mentorship.student.firstName} ${mentorship.student.lastName}`.toLowerCase();
    
    return studentName.includes(searchTerm.toLowerCase());
  });
  
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await mentorshipService.updateMentorshipStatus(id, status);
      toast({
        title: "Status Updated",
        description: `Mentorship request ${status === 'accepted' ? 'accepted' : 'rejected'}.`
      });
      refetch();
      refetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update mentorship status",
        variant: "destructive"
      });
    }
  };

  const handleProgramCreated = () => {
    refetchStats();
    toast({
      title: "Success",
      description: "Mentorship program created successfully!"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mentorship Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your mentorship requests and engage with students
              </p>
            </div>
            <CreateProgramDialog onProgramCreated={handleProgramCreated} />
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statsLoading ? '-' : mentorshipStats?.pendingRequests || 0}
                  </h3>
                </div>
                <div className="rounded-full p-3 bg-yellow-100 dark:bg-yellow-900">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Mentees</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statsLoading ? '-' : mentorshipStats?.activeMentees || 0}
                  </h3>
                </div>
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Programs</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statsLoading ? '-' : mentorshipStats?.activePrograms || 0}
                  </h3>
                </div>
                <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900">
                  <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statsLoading ? '-' : mentorshipStats?.totalRequests || 0}
                  </h3>
                </div>
                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mentorship Requests</h2>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Input
                  placeholder="Search by student name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="pending" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab}>
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">Loading mentorship requests...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <p className="text-red-500">Error loading mentorship requests</p>
                  <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                    Try Again
                  </Button>
                </div>
              ) : filteredMentorships && filteredMentorships.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No {selectedTab === 'all' ? '' : selectedTab} mentorship requests found.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredMentorships?.map((request: MentorshipRequest) => (
                    <Card key={request._id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              {typeof request.student !== 'string' && request.student.avatar ? (
                                <AvatarImage src={request.student.avatar} alt={`${request.student.firstName} ${request.student.lastName}`} />
                              ) : (
                                <AvatarFallback>
                                  {typeof request.student !== 'string' ? 
                                    `${request.student.firstName?.charAt(0) || ''}${request.student.lastName?.charAt(0) || ''}` : 
                                    'ST'}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {typeof request.student !== 'string' ? 
                                  `${request.student.firstName || ''} ${request.student.lastName || ''}` : 
                                  'Unknown Student'}
                              </h3>
                              <div className="flex items-center mt-1">
                                <Badge className={
                                  request.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                                    : request.status === 'accepted'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </Badge>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                                  Requested on {formatDate(request.createdAt.toString())}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {request.status === 'pending' && (
                            <div className="flex mt-4 md:mt-0 space-x-3">
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => handleStatusChange(request._id, 'rejected')}
                              >
                                Decline
                              </Button>
                              <Button 
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => handleStatusChange(request._id, 'accepted')}
                              >
                                Accept
                              </Button>
                            </div>
                          )}
                          
                          {request.status === 'accepted' && (
                            <Button className="mt-4 md:mt-0">
                              Message
                            </Button>
                          )}
                          
                          {request.status === 'rejected' && (
                            <Button 
                              variant="outline" 
                              className="mt-4 md:mt-0"
                              onClick={() => handleStatusChange(request._id, 'accepted')}
                            >
                              Reconsider
                            </Button>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Request Message:</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                            {request.message || "No message provided"}
                          </p>
                        </div>
                        
                        {typeof request.student !== 'string' && request.student.skills && request.student.skills.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                              {request.student.skills.slice(0, 5).map((skill, index) => (
                                <Badge key={index} variant="outline">{skill}</Badge>
                              ))}
                              {request.student.skills.length > 5 && (
                                <Badge variant="outline">+{request.student.skills.length - 5} more</Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
