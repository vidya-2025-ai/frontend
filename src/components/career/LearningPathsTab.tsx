
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { LearningPath } from '@/services/api/careerService';
import { useToast } from '@/hooks/use-toast';

interface LearningPathsTabProps {
  learningPaths: LearningPath[] | undefined;
  isLoading: boolean;
  onViewCourse: (course: any) => void;
}

const LearningPathsTab: React.FC<LearningPathsTabProps> = ({ 
  learningPaths, 
  isLoading, 
  onViewCourse 
}) => {
  const { toast } = useToast();

  const handleExploreCourses = () => {
    toast({
      title: "Exploring Courses",
      description: "Browsing available courses in your areas of interest.",
    });
    
    if (learningPaths && learningPaths.length > 0) {
      const randomIndex = Math.floor(Math.random() * learningPaths.length);
      onViewCourse(learningPaths[randomIndex]);
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
          {learningPaths?.map(path => (
            <Card key={path.id}>
              <CardHeader>
                <CardTitle>{path.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                      <p className="text-sm font-medium">{path.progress}%</p>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{path.modules} modules</p>
                  <Button 
                    className="w-full"
                    onClick={() => onViewCourse(path)}
                  >
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="flex flex-col items-center justify-center border-dashed">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-medium mb-2">Discover New Paths</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Explore learning paths tailored to your career goals
              </p>
              <Button onClick={handleExploreCourses}>
                Explore Courses
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LearningPathsTab;
