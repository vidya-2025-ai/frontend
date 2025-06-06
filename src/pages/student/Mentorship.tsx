
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Clock, Users, Star, MessageSquare, Calendar, Plus } from 'lucide-react';
import { mentorshipService } from '@/services/api/mentorshipService';
import { useToast } from '@/hooks/use-toast';
import type { MentorshipRequest, MentorshipProgram, Mentor } from '@/services/api/types/mentorship';

const Mentorship = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<MentorshipProgram[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [myRequests, setMyRequests] = useState<MentorshipRequest[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<MentorshipProgram | null>(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
    fetchMentors();
    fetchMyRequests();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const data = await mentorshipService.getMentorshipPrograms();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Failed to load mentorship programs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMentors = async () => {
    setIsLoading(true);
    try {
      const data = await mentorshipService.getAvailableMentors();
      const mentorData: Mentor[] = data.map(user => ({
        _id: user._id || user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        organization: user.organization || '',
        jobTitle: user.jobTitle || '',
        avatar: user.avatar || '',
        skills: user.skills || []
      }));
      setMentors(mentorData);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      toast({
        title: "Error",
        description: "Failed to load available mentors.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    setIsLoading(true);
    try {
      const data = await mentorshipService.getMyMentorships();
      const requestsData: MentorshipRequest[] = data.map(request => ({
        ...request,
        _id: request._id || request.id,
        topic: request.topic || 'General Mentorship'
      }));
      setMyRequests(requestsData);
    } catch (error) {
      console.error('Error fetching my requests:', error);
      toast({
        title: "Error",
        description: "Failed to load your mentorship requests.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToProgram = async () => {
    if (!selectedProgram) return;

    setIsApplying(true);
    try {
      await mentorshipService.applyToMentorshipProgram(selectedProgram._id, applicationMessage);
      toast({
        title: "Success",
        description: "Application submitted successfully!",
      });
      setSelectedProgram(null);
      setApplicationMessage('');
      fetchMyRequests();
    } catch (error) {
      console.error('Error applying to program:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const filteredMentors = mentors.filter(mentor =>
    mentor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                Mentorship Platform
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Find Opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="programs">Available Programs</TabsTrigger>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            {isLoading ? (
              <div className="text-center py-10">
                <Clock className="mx-auto h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading programs...</p>
              </div>
            ) : programs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <Card key={program._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="px-4 py-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{program.topic}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>{program.mentor.firstName[0]}{program.mentor.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{program.mentor.firstName} {program.mentor.lastName}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">{program.message}</p>
                      {program.programDetails && (
                        <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
                          <li>Duration: {program.programDetails.duration}</li>
                          <li>Max Participants: {program.programDetails.maxParticipants}</li>
                        </ul>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4 w-full" onClick={() => setSelectedProgram(program)}>Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Apply for {program.topic}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="message">Why do you want to join this program?</Label>
                              <Textarea
                                id="message"
                                value={applicationMessage}
                                onChange={(e) => setApplicationMessage(e.target.value)}
                                placeholder="Write your message here."
                                className="resize-none"
                              />
                            </div>
                          </div>
                          <Button disabled={isApplying} onClick={handleApplyToProgram}>
                            {isApplying ? 'Submitting...' : 'Submit Application'}
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Star className="mx-auto h-6 w-6 text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No programs available at the moment.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mentors">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search mentors by name, organization, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            {isLoading ? (
              <div className="text-center py-10">
                <Clock className="mx-auto h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading mentors...</p>
              </div>
            ) : filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="px-4 py-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.firstName} {mentor.lastName}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>{mentor.firstName[0]}{mentor.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{mentor.organization}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">{mentor.jobTitle}</p>
                      <div className="mt-2">
                        {mentor.skills.map((skill) => (
                          <Badge key={skill} className="mr-1">{skill}</Badge>
                        ))}
                      </div>
                      <Button className="mt-4 w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Request Mentorship
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Users className="mx-auto h-6 w-6 text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No mentors found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-requests">
            {isLoading ? (
              <div className="text-center py-10">
                <Clock className="mx-auto h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading your requests...</p>
              </div>
            ) : myRequests.length > 0 ? (
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <Card key={request._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="px-4 py-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.topic}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      {request.mentor && (
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarFallback>{request.mentor.firstName[0]}{request.mentor.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <span>{request.mentor.firstName} {request.mentor.lastName}</span>
                        </div>
                      )}
                      <p className="text-gray-700 dark:text-gray-400 text-sm">{request.message}</p>
                      <Badge
                        className="mt-2"
                        variant={
                          request.status === 'pending' ? 'secondary' :
                            request.status === 'accepted' ? 'default' : 'destructive'
                        }
                      >
                        {request.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <MessageSquare className="mx-auto h-6 w-6 text-gray-500 dark:text-gray-400" />
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">You have not submitted any mentorship requests yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mentorship;
