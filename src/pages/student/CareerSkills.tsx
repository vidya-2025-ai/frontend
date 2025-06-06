
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import BackButton from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, MapPin, GraduationCap, Code, Lightbulb } from 'lucide-react';
import { careerService } from '@/services/api/careerService';
import { skillService } from '@/services/api/skillService';
import { useToast } from '@/hooks/use-toast';

// Import the new components
import CareerPathsCard from '@/components/career/CareerPathsCard';
import MilestonesCard from '@/components/career/MilestonesCard';
import RecommendedJobsCard from '@/components/career/RecommendedJobsCard';
import SkillAssessmentsCard from '@/components/career/SkillAssessmentsCard';
import SkillProfileCard from '@/components/career/SkillProfileCard';
import LearningPathsTab from '@/components/career/LearningPathsTab';
import ProjectsTab from '@/components/career/ProjectsTab';
import RecommendationsTab from '@/components/career/RecommendationsTab';

const CareerSkills = () => {
  const [mainTab, setMainTab] = useState("career");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch career data
  const { data: careerData, isLoading: isCareerLoading, error: careerError } = useQuery({
    queryKey: ['careerPaths'],
    queryFn: careerService.getCareerData
  });

  // Fetch job recommendations
  const { data: recommendedJobs, isLoading: isJobsLoading, error: jobsError } = useQuery({
    queryKey: ['recommendedJobs'],
    queryFn: careerService.getRecommendedJobs
  });

  // Fetch skill assessments
  const { data: userSkills, isLoading: isSkillsLoading, error: skillsError } = useQuery({
    queryKey: ['userSkills'],
    queryFn: skillService.getUserSkills
  });

  // Fetch learning paths
  const { data: learningPaths, isLoading: isPathsLoading, error: pathsError } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: careerService.getLearningPaths
  });

  // Fetch projects
  const { data: projects, isLoading: isProjectsLoading, error: projectsError } = useQuery({
    queryKey: ['careerProjects'],
    queryFn: careerService.getProjects
  });

  // Fetch recommendations
  const { data: recommendations, isLoading: isRecommendationsLoading, error: recommendationsError } = useQuery({
    queryKey: ['careerRecommendations'],
    queryFn: careerService.getRecommendations
  });

  //View career role map
  const careerroadmap = () => {
    navigate('/student/careermap');
  }

  // Handle take assessment button click
  const handleTakeAssessment = () => {
    navigate('/student/skill-assessment');
  };

  // Handle learning path button click
  const handleViewCourse = (course: any) => {
    navigate('/student/course-view', { state: { course } });
  };

  // Handle project button click
  const handleViewProject = (project: any) => {
    navigate('/student/project-details', { state: { project } });
  };

  // Handle start learning button click for milestones
  const handleStartLearning = (milestone: any) => {
    toast({
      title: "Learning Started",
      description: `You've started learning ${milestone.name}`,
    });

    // Navigate to a learning path related to this milestone
    if (learningPaths && learningPaths.length > 0) {
      navigate('/student/course-view', { state: { course: learningPaths[0] } });
    }
  };

  // Handle job view details button click
  const handleViewJob = (job: any) => {
    toast({
      title: "Viewing Job",
      description: `You're viewing details for ${job.title}`,
    });

    // In a real app, we would navigate to a job details page
    window.open('https://www.example.com/jobs', '_blank');
  };

  // Handle complete profile button click
  const handleCompleteProfile = () => {
    navigate('/student/settings');
  };

  // Handle any errors
  useEffect(() => {
    if (careerError) {
      toast({
        title: "Error loading career data",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  }, [careerError, toast]);

  // Format skill assessments
  const skillAssessments = userSkills?.map(skill => ({
    id: skill.id,
    name: skill.skill.name,
    score: skill.level * 20, // Convert 1-5 scale to 0-100
    total: 100,
    date: skill.assessments?.[0]?.date || new Date().toISOString()
  })) || [];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-4">
              <BackButton to="/student/dashboard" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Career & Skills Development
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Plan your career path and develop your skills portfolio
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={careerroadmap}>Career Roadmap</Button>
              </div>
            </div>

            <Tabs defaultValue="skills" value={mainTab} onValueChange={setMainTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                {/*<TabsTrigger value="career" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Career Map
                </TabsTrigger>*/}
                <TabsTrigger value="skills" className="flex items-center">
                  <GraduationCap className="h-4 w-4" /> Skills & Learning
                </TabsTrigger>
              </TabsList>

              {/* Career Map Tab 
              <TabsContent value="career" className="space-y-6">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    <CareerPathsCard 
                      careerData={careerData} 
                      isLoading={isCareerLoading} 
                    />
                    <MilestonesCard 
                      careerData={careerData} 
                      isLoading={isCareerLoading} 
                      onStartLearning={handleStartLearning}
                    />
                  </div>

                  <div className="space-y-6">
                    <RecommendedJobsCard 
                      recommendedJobs={recommendedJobs} 
                      isLoading={isJobsLoading} 
                      onViewJob={handleViewJob}
                    />
                  </div>
                </div>
              </TabsContent>*/}

              {/* Skills & Learning Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Tabs defaultValue="assessments" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="assessments" className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> Assessments
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> Learning Paths
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="flex items-center gap-1">
                      <Code className="h-3 w-3" /> Projects
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> Recommendations
                    </TabsTrigger>
                  </TabsList>

                  {/* Assessments Tab */}
                  <TabsContent value="assessments">
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <SkillAssessmentsCard 
                          skillAssessments={skillAssessments} 
                          isLoading={isSkillsLoading} 
                          onTakeAssessment={handleTakeAssessment}
                        />
                      </div>
                      <div>
                        <SkillProfileCard onCompleteProfile={handleCompleteProfile} />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Learning Paths Tab */}
                  <TabsContent value="courses">
                    <LearningPathsTab 
                      learningPaths={learningPaths} 
                      isLoading={isPathsLoading} 
                      onViewCourse={handleViewCourse}
                    />
                  </TabsContent>

                  {/* Projects Tab */}
                  <TabsContent value="projects">
                    <ProjectsTab 
                      projects={projects} 
                      isLoading={isProjectsLoading} 
                      onViewProject={handleViewProject}
                    />
                  </TabsContent>

                  {/* Recommendations Tab */}
                  <TabsContent value="recommendations">
                    <RecommendationsTab 
                      recommendations={recommendations} 
                      learningPaths={learningPaths}
                      isLoading={isRecommendationsLoading} 
                      onViewCourse={handleViewCourse}
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSkills;
