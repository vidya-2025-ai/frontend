
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import { Project } from '@/services/api/careerService';
import { useToast } from '@/hooks/use-toast';

interface ProjectsTabProps {
  projects: Project[] | undefined;
  isLoading: boolean;
  onViewProject: (project: Project) => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ 
  projects, 
  isLoading, 
  onViewProject 
}) => {
  const { toast } = useToast();

  const handleCreateProject = () => {
    toast({
      title: "Creating New Project",
      description: "Opening project creation wizard.",
    });
    
    if (projects && projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      onViewProject(projects[randomIndex]);
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        [1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))
      ) : (
        <>
          {projects?.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </p>
                <Button 
                  className="w-full"
                  onClick={() => onViewProject(project)}
                >
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
          <Card className="flex flex-col items-center justify-center border-dashed">
            <CardContent className="pt-6 text-center">
              <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-medium mb-2">Start New Project</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Create or join a hands-on project to build your portfolio
              </p>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProjectsTab;
