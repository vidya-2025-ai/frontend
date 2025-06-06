
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareerData } from '@/services/api/careerService';

interface MilestonesCardProps {
  careerData: CareerData | undefined;
  isLoading: boolean;
  onStartLearning: (milestone: any) => void;
}

const MilestonesCard: React.FC<MilestonesCardProps> = ({ careerData, isLoading, onStartLearning }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : careerData?.careerPaths && careerData.careerPaths.length > 0 ? (
          <Tabs defaultValue={careerData.careerPaths[0].id.toString()} className="mt-2">
            <TabsList className="grid grid-cols-3 mb-4">
              {careerData.careerPaths.map(path => (
                <TabsTrigger key={path.id} value={path.id.toString()}>
                  {path.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {careerData.careerPaths.map(path => (
              <TabsContent key={path.id} value={path.id.toString()} className="space-y-4">
                {careerData?.milestones
                  ?.filter(milestone => milestone.pathId === path.id)
                  .map(milestone => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-700">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          milestone.completed ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                        }`}>
                          {milestone.completed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            milestone.id
                          )}
                        </div>
                        <span className={milestone.completed ? "line-through text-gray-500" : ""}>
                          {milestone.name}
                        </span>
                      </div>
                      {!milestone.completed && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onStartLearning(milestone)}
                        >
                          Start Learning
                        </Button>
                      )}
                    </div>
                  ))
                }
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No career paths available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestonesCard;
