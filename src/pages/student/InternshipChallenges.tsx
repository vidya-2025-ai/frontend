import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Award, Calendar, Code, FileCheck, Send, Users } from "lucide-react";
import { challengeService } from '@/services/api/challengeService';
import { Challenge, ChallengeSolution } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';

const InternshipChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [mySolutions, setMySolutions] = useState<ChallengeSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [solutionContent, setSolutionContent] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [activeTab, setActiveTab] = useState('open');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const data = await challengeService.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        toast({
          title: "Error",
          description: "Failed to load challenges. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleSubmitSolution = async () => {
    if (!selectedChallenge) {
      toast({
        title: "Error",
        description: "No challenge selected.",
        variant: "destructive"
      });
      return;
    }

    if (!solutionContent.trim()) {
      toast({
        title: "Error",
        description: "Please provide a solution description.",
        variant: "destructive"
      });
      return;
    }

    try {
      const solution = await challengeService.submitSolution(selectedChallenge._id!, {
        content: solutionContent,
        repositoryUrl: repoUrl
      });

      setMySolutions([...mySolutions, solution]);
      setSolutionContent('');
      setRepoUrl('');
      
      toast({
        title: "Success",
        description: "Your solution has been submitted successfully!"
      });

      // Update the submission count in the challenge list
      const updatedChallenges = challenges.map(challenge => {
        if (challenge._id === selectedChallenge._id) {
          return {
            ...challenge,
            submissionCount: (challenge.submissionCount || 0) + 1
          };
        }
        return challenge;
      });
      setChallenges(updatedChallenges);

    } catch (error) {
      console.error('Error submitting solution:', error);
      toast({
        title: "Error",
        description: "Failed to submit your solution. You may have already submitted a solution for this challenge.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = (deadline: string | Date) => {
    return new Date() > new Date(deadline);
  };

  const filterChallenges = (status: 'open' | 'closed' | 'all') => {
    if (status === 'all') {
      return challenges;
    }
    
    return challenges.filter(challenge => {
      const deadlinePassed = isDeadlinePassed(challenge.deadline);
      return status === 'open' ? !deadlinePassed : deadlinePassed;
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Internship Challenges</h1>
            
            <Tabs defaultValue="open" className="mb-6">
              <TabsList>
                <TabsTrigger value="open">Open Challenges</TabsTrigger>
                <TabsTrigger value="closed">Past Challenges</TabsTrigger>
                <TabsTrigger value="my-solutions">My Solutions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="open" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex flex-wrap gap-1 mt-3">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-9 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="closed" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex flex-wrap gap-1 mt-3">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-9 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="my-solutions" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Internship Challenges</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="open">Open Challenges</TabsTrigger>
              <TabsTrigger value="closed">Past Challenges</TabsTrigger>
              <TabsTrigger value="my-solutions">My Solutions</TabsTrigger>
            </TabsList>

            <TabsContent value="open" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterChallenges('open').length === 0 ? (
                  <Card className="md:col-span-3">
                    <CardContent className="flex flex-col items-center justify-center text-center p-6">
                      <Award className="h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No open challenges</h3>
                      <p className="text-gray-500 mb-4">
                        Check back later for new challenges or view past challenges
                      </p>
                      <Button onClick={() => setActiveTab('closed')}>
                        View Past Challenges
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filterChallenges('open').map((challenge) => (
                    <Card key={challenge._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription>
                          by {challenge.organizationName || challenge.organization}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {challenge.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(challenge.skillsRequired || challenge.skills || []).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Due: {formatDate(challenge.deadline)}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{challenge.submissionCount || 0} submissions</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedChallenge(challenge)}
                        >
                          View Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="closed" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterChallenges('closed').length === 0 ? (
                  <Card className="md:col-span-3">
                    <CardContent className="flex flex-col items-center justify-center text-center p-6">
                      <FileCheck className="h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No past challenges</h3>
                      <p className="text-gray-500 mb-4">
                        All challenges are currently open for submission
                      </p>
                      <Button onClick={() => setActiveTab('open')}>
                        View Open Challenges
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filterChallenges('closed').map((challenge) => (
                    <Card key={challenge._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription>
                          by {challenge.organizationName || challenge.organization}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {challenge.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(challenge.skillsRequired || challenge.skills || []).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Ended: {formatDate(challenge.deadline)}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{challenge.submissionCount || 0} submissions</span>
                          </div>
                        </div>
                        
                        <Badge className="mt-3 bg-gray-100 text-gray-800">Challenge Closed</Badge>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant="secondary"
                          onClick={() => setSelectedChallenge(challenge)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="my-solutions" className="mt-4">
              {mySolutions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <Code className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No solutions submitted</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't submitted solutions to any challenges yet
                    </p>
                    <Button onClick={() => setActiveTab('open')}>
                      Browse Open Challenges
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {mySolutions.map((solution) => (
                    <Card key={solution._id || solution.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Challenge: Solution #{solution._id || solution.id}
                        </CardTitle>
                        <CardDescription>
                          Submitted on {formatDate(solution.submittedAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{solution.content}</p>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Repository URL</p>
                          <p className="text-sm text-blue-600">
                            {solution.attachments && solution.attachments.length > 0 ? 
                              solution.attachments[0] : solution.repositoryUrl || 'No repository provided'}
                          </p>
                        </div>
                        
                        <Badge className={
                          (solution.status === 'evaluated') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }>
                          {solution.status === 'evaluated' ? 'Evaluated' : 'Pending Evaluation'}
                        </Badge>
                        
                        {solution.status === 'evaluated' && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium mb-1">Feedback</p>
                            <p className="text-sm text-gray-600">{solution.feedback || 'No feedback provided'}</p>
                            
                            {solution.score !== undefined && (
                              <div className="mt-2 flex items-center">
                                <span className="font-medium mr-2">Score:</span>
                                <Badge className="bg-blue-100 text-blue-800">
                                  {solution.score}/10
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Challenge Details Dialog */}
          {selectedChallenge && (
            <Dialog 
              open={!!selectedChallenge} 
              onOpenChange={(open) => !open && setSelectedChallenge(null)}
            >
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{selectedChallenge.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[70vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Posted by {selectedChallenge.organizationName || selectedChallenge.organization}</p>
                      <p className="text-sm text-gray-500">
                        Created on {formatDate(selectedChallenge.createdAt)}
                      </p>
                    </div>
                    <Badge className={
                      isDeadlinePassed(selectedChallenge.deadline) 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }>
                      {isDeadlinePassed(selectedChallenge.deadline) ? 'Closed' : 'Open'}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-gray-600">{selectedChallenge.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedChallenge.skillsRequired || selectedChallenge.skills || []).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Deadline</h3>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatDate(selectedChallenge.deadline)}</span>
                      </div>
                    </div>

                    {isDeadlinePassed(selectedChallenge.deadline) ? (
                      <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This challenge is now closed for submissions.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-medium">Submit Your Solution</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Solution Description
                          </label>
                          <Textarea 
                            placeholder="Describe your solution approach..."
                            value={solutionContent}
                            onChange={(e) => setSolutionContent(e.target.value)}
                            className="min-h-[120px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Repository URL (Optional)
                          </label>
                          <Input 
                            placeholder="https://github.com/yourusername/project"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={handleSubmitSolution}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Submit Solution
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipChallenges;
