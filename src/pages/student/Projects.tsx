
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Code } from "lucide-react";
import { projectService, Project } from '@/services/api/projectService';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectService.getProjectsFromResumes();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'On Hold':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-18" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Projects</h1>
            <div className="text-sm text-gray-600">
              {projects.length} project{projects.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {projects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-12">
                <Code className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-gray-500 mb-4">
                  Add projects to your resume to see them displayed here
                </p>
                <Button>
                  Go to Resume Builder
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    {(project.startDate || project.endDate) && (
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {project.link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Project Details Dialog */}
          {selectedProject && (
            <Dialog 
              open={!!selectedProject} 
              onOpenChange={(open) => !open && setSelectedProject(null)}
            >
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-xl">{selectedProject.title}</DialogTitle>
                    <Badge variant={getStatusColor(selectedProject.status)}>
                      {selectedProject.status}
                    </Badge>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  {(selectedProject.startDate || selectedProject.endDate) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(selectedProject.startDate)} - {selectedProject.endDate ? formatDate(selectedProject.endDate) : 'Present'}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {selectedProject.technologies.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedProject.link || selectedProject.githubLink) && (
                    <div>
                      <h3 className="font-semibold mb-2">Links</h3>
                      <div className="flex space-x-3">
                        {selectedProject.link && (
                          <Button variant="outline" asChild>
                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {selectedProject.githubLink && (
                          <Button variant="outline" asChild>
                            <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              GitHub Repository
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                    Source: Resume Builder
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

export default Projects;
