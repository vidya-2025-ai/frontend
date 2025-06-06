
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Calendar, Trophy, Code, ExternalLink } from 'lucide-react';
import { challengeService } from '@/services/api/challengeService';
import { useToast } from '@/hooks/use-toast';

const Challenges = () => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [solutionForm, setSolutionForm] = useState({
    content: '',
    repositoryUrl: '',
    attachments: []
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const data = await challengeService.getAllChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
      toast({
        title: "Error",
        description: "Failed to fetch challenges",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (!selectedChallenge || !solutionForm.content.trim()) {
      toast({
        title: "Error",
        description: "Please provide a solution description",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      await challengeService.submitSolution(selectedChallenge.id, solutionForm);
      
      toast({
        title: "Success",
        description: "Solution submitted successfully!"
      });

      setSelectedChallenge(null);
      setSolutionForm({ content: '', repositoryUrl: '', attachments: [] });
      fetchChallenges();
    } catch (error) {
      console.error('Failed to submit solution:', error);
      toast({
        title: "Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.skillsRequired.some((skill: string) => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isDeadlinePassed = (deadline: string) => new Date() > new Date(deadline);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Corporate Challenges
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Participate in real-world challenges and showcase your skills
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredChallenges.length === 0 ? (
          <Card className="text-center p-8">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No challenges found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new challenges'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant={isDeadlinePassed(challenge.deadline) ? "destructive" : "default"}>
                      {isDeadlinePassed(challenge.deadline) ? "Expired" : "Active"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {challenge.organization}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {challenge.description.length > 150 
                      ? `${challenge.description.substring(0, 150)}...` 
                      : challenge.description
                    }
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {challenge.submissionCount} submissions
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Required Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {challenge.skillsRequired.slice(0, 3).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {challenge.skillsRequired.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{challenge.skillsRequired.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        disabled={isDeadlinePassed(challenge.deadline)}
                        onClick={() => setSelectedChallenge(challenge)}
                      >
                        {isDeadlinePassed(challenge.deadline) ? "Challenge Expired" : "Apply Now"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Submit Solution: {challenge.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Challenge Description</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {challenge.description}
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="solution">Solution Description *</Label>
                          <Textarea
                            id="solution"
                            placeholder="Describe your solution approach, technologies used, and key features..."
                            value={solutionForm.content}
                            onChange={(e) => setSolutionForm({...solutionForm, content: e.target.value})}
                            rows={6}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="repository">Repository URL (Optional)</Label>
                          <Input
                            id="repository"
                            placeholder="https://github.com/username/repository"
                            value={solutionForm.repositoryUrl}
                            onChange={(e) => setSolutionForm({...solutionForm, repositoryUrl: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSubmitSolution} disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit Solution"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
