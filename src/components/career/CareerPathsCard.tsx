
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CareerData } from '@/services/api/careerService';

interface CareerPathsCardProps {
  careerData: CareerData | undefined;
  isLoading: boolean;
}

const CareerPathsCard: React.FC<CareerPathsCardProps> = ({ careerData, isLoading }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Your Career Paths</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          Array.isArray(careerData?.careerPaths) && careerData.careerPaths.map(path => (
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
                <span className="text-sm">{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CareerPathsCard;
