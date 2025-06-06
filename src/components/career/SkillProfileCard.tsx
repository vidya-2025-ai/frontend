
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SkillProfileCardProps {
  onCompleteProfile: () => void;
}

const SkillProfileCard: React.FC<SkillProfileCardProps> = ({ onCompleteProfile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-300">Profile Completion</h3>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={70} className="h-2 flex-1" />
            <span className="text-sm font-medium">70%</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete your skill profile to improve job match accuracy.
          </p>
          <Button 
            className="w-full mt-4" 
            variant="outline"
            onClick={onCompleteProfile}
          >
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillProfileCard;
