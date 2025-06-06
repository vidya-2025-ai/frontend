
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recommendations, LearningPath } from '@/services/api/careerService';
import { useToast } from '@/hooks/use-toast';

interface RecommendationsTabProps {
  recommendations: Recommendations | undefined;
  learningPaths: LearningPath[] | undefined;
  isLoading: boolean;
  onViewCourse: (course: any) => void;
}

const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ 
  recommendations, 
  learningPaths,
  isLoading, 
  onViewCourse 
}) => {
  const { toast } = useToast();

  const handleStartLearning = (recTitle: string) => {
    if (learningPaths && learningPaths.length > 0) {
      const randomIndex = Math.floor(Math.random() * learningPaths.length);
      onViewCourse(learningPaths[randomIndex]);
    } else {
      toast({
        title: "Starting Learning",
        description: `You've started learning ${recTitle}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Based on Your Career Goals</h3>
              {recommendations?.careerBased.map(rec => (
                <div key={rec.id} className="p-4 rounded-lg border dark:border-gray-700">
                  <h4 className="font-medium mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {rec.description}
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => handleStartLearning(rec.title)}
                  >
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Industry Trending Skills</h3>
              {recommendations?.trending.map(rec => (
                <div key={rec.id} className="p-4 rounded-lg border dark:border-gray-700">
                  <h4 className="font-medium mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {rec.description}
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => handleStartLearning(rec.title)}
                  >
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;
