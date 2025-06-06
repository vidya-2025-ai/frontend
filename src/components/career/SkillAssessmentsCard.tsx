
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SkillAssessment {
  id: string;
  name: string;
  score: number;
  total: number;
  date: string;
}

interface SkillAssessmentsCardProps {
  skillAssessments: SkillAssessment[];
  isLoading: boolean;
  onTakeAssessment: () => void;
}

const SkillAssessmentsCard: React.FC<SkillAssessmentsCardProps> = ({ 
  skillAssessments, 
  isLoading, 
  onTakeAssessment 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Skill Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {skillAssessments.map(assessment => (
              <div key={assessment.id} className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{assessment.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(assessment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(assessment.score / assessment.total) * 100} 
                    className="h-2 flex-1" 
                  />
                  <span className="text-sm font-medium">
                    {assessment.score}/{assessment.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button 
          className="w-full mt-4"
          onClick={onTakeAssessment}
        >
          Take New Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillAssessmentsCard;
