import React, { useState, useEffect } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, Plus, Calendar, Users, Trophy, Eye, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { challengeService } from '@/services/api/challengeService';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ChallengeFormData {
  title: string;
  description: string;
  skillsRequired: string; // This will be a comma-separated string in the form
  deadline: string;
}

const Challenges = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [viewingSolutions, setViewingSolutions] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChallengeFormData>({
    defaultValues: {
      title: '',
      description: '',
      skillsRequired: '',
      deadline: ''
    }
  });
  
  useEffect(() => {
    fetchChallenges();
  }, []);
  
  const fetchChallenges = async () => {
    try {
      const data = await challengeService.getRecruiterChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
      toast.error('Failed to fetch challenges');
    }
  };

  const fetchSolutions = async (challengeId: string) => {
    try {
      const data = await challengeService.getSolutions(challengeId);
      setSolutions(data);
    } catch (error) {
      console.error('Failed to fetch solutions:', error);
      toast.error('Failed to fetch solutions');
    }
  };

  const handleViewSolutions = async (challenge: any) => {
    setSelectedChallenge(challenge);
    await fetchSolutions(challenge.id);
    setViewingSolutions(true);
  };

  const handleEvaluateSolution = async (solutionId: string, score: number, feedback: string) => {
    try {
      await challengeService.evaluateSolution(selectedChallenge.id, solutionId, { score, feedback });
      toast.success('Solution evaluated successfully');
      await fetchSolutions(selectedChallenge.id);
    } catch (error) {
      console.error('Failed to evaluate solution:', error);
      toast.error('Failed to evaluate solution');
    }
  };
  
  const onSubmit = async (data: ChallengeFormData) => {
    try {
      // Convert comma-separated skills string to array before submitting
      const skillsArray = data.skillsRequired.split(',').map(skill => skill.trim());
      
      await challengeService.createChallenge({
        ...data,
        skillsRequired: skillsArray // Now this is correctly a string[]
      });
      
      toast.success('Challenge created successfully');
      setIsCreating(false);
      reset();
      
      // Refresh challenges list
      const updatedChallenges = await challengeService.getRecruiterChallenges();
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Failed to create challenge:', error);
      toast.error('Failed to create challenge');
    }
  };
  
  // Group challenges by status
  const activeChallenges = challenges.filter(c => c.isActive);
  const pastChallenges = challenges.filter(c => !c.isActive);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search challenges..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Corporate Challenges</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create interactive challenges to identify and recruit top talent
                  </p>
                </div>
                <Button className="flex items-center gap-2" onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4" />
                  Create Challenge
                </Button>
              </div>

              {isCreating && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Create New Challenge</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Title
                        </label>
                        <Input
                          id="title"
                          {...register('title', { required: 'Title is required' })}
                          className="mt-1"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea
                          id="description"
                          {...register('description', { required: 'Description is required' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows={3}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Skills Required (comma-separated)
                        </label>
                        <Input
                          id="skillsRequired"
                          {...register('skillsRequired', { required: 'Skills are required' })}
                          className="mt-1"
                          placeholder="React, Node.js, TypeScript"
                        />
                        {errors.skillsRequired && <p className="text-red-500 text-xs mt-1">{errors.skillsRequired.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Deadline
                        </label>
                        <Input
                          id="deadline"
                          type="date"
                          {...register('deadline', { required: 'Deadline is required' })}
                          className="mt-1"
                        />
                        {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                      <Button type="submit">Create Challenge</Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{challenges.length}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activeChallenges.length} active, {pastChallenges.length} completed
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {challenges.reduce((sum, challenge) => sum + (challenge.submissionCount || 0), 0)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total participants across all challenges</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hiring Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {challenges.length ? (6.7 * challenges.length / 10).toFixed(1) : 0}%
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversion from challenges to hires</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="active" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="active">Active Challenges</TabsTrigger>
                  <TabsTrigger value="past">Past Challenges</TabsTrigger>
                  <TabsTrigger value="draft">Draft Challenges</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  {activeChallenges.length === 0 ? (
                    <Card className="text-center p-8">
                      <p className="text-gray-500 dark:text-gray-400">No active challenges found</p>
                      <Button className="mt-4" onClick={() => setIsCreating(true)}>Create Challenge</Button>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {activeChallenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{challenge.title}</CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                              </div>
                              <Badge variant="default">
                                {challenge.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {challenge.submissionCount} submissions
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date() > new Date(challenge.deadline) ? "Expired" : "Active"}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {challenge.skillsRequired?.map((skill: string, idx: number) => (
                                  <Badge key={idx} variant="outline">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button 
                              variant="outline" 
                              onClick={() => handleViewSolutions(challenge)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Submissions ({challenge.submissionCount})
                            </Button>
                            <Button>Manage Challenge</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {pastChallenges.length === 0 ? (
                    <Card className="text-center p-8">
                      <p className="text-gray-500 dark:text-gray-400">No past challenges found</p>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {pastChallenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{challenge.title}</CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                              </div>
                              <Badge variant="secondary">
                                {challenge.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {challenge.startDate} - {challenge.endDate}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {challenge.participants} participants
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {challenge.hires} candidates hired
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Winners</p>
                              <div className="space-y-3">
                                {challenge.winners.map((winner, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                    <Avatar>
                                      <AvatarFallback>{winner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">{winner.name}</p>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">{winner.project}</p>
                                    </div>
                                    {idx === 0 && (
                                      <Badge className="ml-auto">1st Place</Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">View All Submissions</Button>
                            <Button>Challenge Report</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="draft">
                  <Card>
                    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Create a New Challenge</h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                        Draft a new corporate challenge to identify talented candidates through hands-on projects
                      </p>
                      <Button onClick={() => setIsCreating(true)}>Create Challenge</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Dialog */}
      <Dialog open={viewingSolutions} onOpenChange={setViewingSolutions}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Submissions for: {selectedChallenge?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {solutions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No submissions yet</p>
            ) : (
              solutions.map((solution) => (
                <Card key={solution.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{solution.student.name}</h4>
                        <p className="text-sm text-gray-500">
                          Submitted: {new Date(solution.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={solution.status === 'evaluated' ? 'default' : 'secondary'}>
                        {solution.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Solution Description:</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {solution.content}
                        </p>
                      </div>
                      
                      {solution.repositoryUrl && (
                        <div>
                          <h5 className="font-medium text-sm mb-1">Repository:</h5>
                          <a 
                            href={solution.repositoryUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {solution.repositoryUrl}
                          </a>
                        </div>
                      )}
                      
                      {solution.status === 'evaluated' && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">Score: {solution.score}/10</span>
                          </div>
                          {solution.feedback && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {solution.feedback}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  {solution.status === 'submitted' && (
                    <CardFooter>
                      <EvaluationForm 
                        onEvaluate={(score, feedback) => handleEvaluateSolution(solution.id, score, feedback)}
                      />
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Evaluation Form Component
const EvaluationForm = ({ onEvaluate }: { onEvaluate: (score: number, feedback: string) => void }) => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    onEvaluate(score, feedback);
    setScore(0);
    setFeedback('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Evaluate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Evaluate Solution</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="score">Score (0-10)</Label>
            <Input
              id="score"
              type="number"
              min="0"
              max="10"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit Evaluation</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Challenges;
