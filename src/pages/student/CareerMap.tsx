
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import CareerRoleInput from '@/components/career/CareerRoleInput';
import api from '@/services/api/index';
import { Sparkles, Target, TrendingUp } from 'lucide-react';

interface GeneratedRoadmap {
  desiredRole: string;
  estimatedTimeframe: string;
  careerPaths: Array<{
    id: number;
    name: string;
    progress: number;
    level: string;
  }>;
  milestones: Array<{
    id: number;
    name: string;
    completed: boolean;
    pathId: number;
    timeframe?: string;
  }>;
  recommendedResources: string[];
}

const CareerMap = () => {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);
  const { toast } = useToast();

  // Fetch default career data
  const { data: defaultCareerData, isLoading: isDefaultLoading } = useQuery({
    queryKey: ['careerPaths'],
    queryFn: async () => {
      try {
        const response = await api.get('/career/paths');
        return response.data;
      } catch (error) {
        console.error('Error fetching career paths:', error);
        // Return mock data if API fails
        return {
          careerPaths: [
            { id: 1, name: "Frontend Development", progress: 65, level: "Intermediate" },
            { id: 2, name: "UX/UI Design", progress: 42, level: "Beginner" },
            { id: 3, name: "Data Analysis", progress: 28, level: "Beginner" }
          ],
          milestones: [
            { id: 1, name: "HTML & CSS Mastery", completed: true, pathId: 1 },
            { id: 2, name: "JavaScript Fundamentals", completed: true, pathId: 1 },
            { id: 3, name: "React Basics", completed: false, pathId: 1 }
          ]
        };
      }
    }
  });

  // Fetch recommended jobs
  const { data: recommendedJobs, isLoading: isJobsLoading } = useQuery({
    queryKey: ['recommendedJobs'],
    queryFn: async () => {
      try {
        const response = await api.get('/career/recommended-jobs');
        return response.data;
      } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        // Return mock data if API fails
        return [
          {
            id: 1,
            title: "Frontend Developer Intern",
            company: "TechCorp",
            match: 92,
            skills: ["React", "JavaScript", "CSS"]
          },
          {
            id: 2,
            title: "UI/UX Design Assistant",
            company: "DesignStudio",
            match: 85,
            skills: ["Figma", "UI Design", "Wireframing"]
          }
        ];
      }
    }
  });

  // Generate roadmap mutation
  const generateRoadmapMutation = useMutation({
    mutationFn: async ({ role, skills, experience }: { role: string; skills: string[]; experience: string }) => {
      console.log('Generating roadmap for:', role, skills, experience);
      try {
        const response = await api.post('/career/generate-roadmap', {
          desiredRole: role,
          currentSkills: skills,
          experience: experience
        });
        return response.data;
      } catch (error) {
        console.error('Error generating roadmap:', error);
        // Return mock roadmap if API fails
        return {
          desiredRole: role,
          estimatedTimeframe: "6-12 months",
          careerPaths: [
            { id: 1, name: "Technical Skills", progress: 0, level: "Beginner" },
            { id: 2, name: "Soft Skills", progress: 0, level: "Beginner" },
            { id: 3, name: "Industry Knowledge", progress: 0, level: "Beginner" }
          ],
          milestones: [
            { id: 1, name: "Learn Fundamentals", completed: false, pathId: 1, timeframe: "1-2 months" },
            { id: 2, name: "Build First Project", completed: false, pathId: 1, timeframe: "2-3 months" },
            { id: 3, name: "Develop Communication Skills", completed: false, pathId: 2, timeframe: "3-4 months" }
          ],
          recommendedResources: [
            "Online courses and tutorials",
            "Practice projects",
            "Open source contributions",
            "Professional networking"
          ]
        };
      }
    },
    onSuccess: (data) => {
      setGeneratedRoadmap(data);
      toast({
        title: "Roadmap Generated!",
        description: `Your personalized roadmap for ${data.desiredRole} is ready.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive"
      });
      console.error('Error generating roadmap:', error);
    }
  });

  const handleGenerateRoadmap = (role: string, skills: string[], experience: string) => {
    generateRoadmapMutation.mutate({ role, skills, experience });
  };

  // Use generated roadmap if available, otherwise use default data
  const displayData = generatedRoadmap || defaultCareerData;
  const careerPaths = displayData?.careerPaths || [];
  const milestones = displayData?.milestones || [];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  AI-Powered Career Map
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {generatedRoadmap 
                    ? `Personalized roadmap for ${generatedRoadmap.desiredRole}`
                    : "Generate your personalized career roadmap using AI"
                  }
                </p>
              </div>
            </div>

            {/* Career Role Input Component */}
            <div className="mb-8">
              <CareerRoleInput 
                onGenerateRoadmap={handleGenerateRoadmap}
                isLoading={generateRoadmapMutation.isPending}
              />
            </div>

            {/* Generated Roadmap Summary */}
            {generatedRoadmap && (
              <div className="mb-6">
                <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Your Personalized Roadmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Target Role</p>
                        <p className="font-semibold text-purple-600">{generatedRoadmap.desiredRole}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Duration</p>
                        <p className="font-semibold text-blue-600">{generatedRoadmap.estimatedTimeframe}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Learning Paths</p>
                        <p className="font-semibold text-green-600">{careerPaths.length} Active Paths</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Recommended Resources:</p>
                      <div className="flex flex-wrap gap-2">
                        {generatedRoadmap.recommendedResources.map((resource, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{resource}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Career Paths and Progress */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Your Career Paths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {careerPaths.map(path => (
                      <div key={path.id} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium">{path.name}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant={
                                path.level === "Beginner" ? "outline" : 
                                path.level === "Intermediate" ? "secondary" : "default"
                              }>
                                {path.level}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-sm font-semibold">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-3" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones.slice(0, 6).map(milestone => (
                        <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              milestone.completed ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                            }`}>
                              {milestone.completed ? '✓' : milestone.id}
                            </div>
                            <div>
                              <span className={milestone.completed ? "line-through text-gray-500" : ""}>
                                {milestone.name}
                              </span>
                              {milestone.timeframe && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">{milestone.timeframe}</p>
                              )}
                            </div>
                          </div>
                          {!milestone.completed && (
                            <Button variant="outline" size="sm">Start Learning</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommended Opportunities */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedJobs?.slice(0, 3).map(opportunity => (
                        <div key={opportunity.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-sm">{opportunity.title}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{opportunity.company}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                              {opportunity.match}% Match
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {opportunity.skills?.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                          <Button className="w-full" size="sm">View Details</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMap;
