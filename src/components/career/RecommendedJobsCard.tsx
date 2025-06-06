
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecommendedJob } from '@/services/api/careerService';

interface RecommendedJobsCardProps {
  recommendedJobs: RecommendedJob[] | undefined;
  isLoading: boolean;
  onViewJob: (job: RecommendedJob) => void;
}

const RecommendedJobsCard: React.FC<RecommendedJobsCardProps> = ({ recommendedJobs, isLoading, onViewJob }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Recommended Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendedJobs?.map(job => (
              <div key={job.id} className="p-4 border rounded-lg dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {job.match}% Match
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                </div>
                <Button 
                  className="w-full mt-3" 
                  size="sm"
                  onClick={() => onViewJob(job)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedJobsCard;
