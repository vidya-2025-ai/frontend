
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Target, Sparkles } from 'lucide-react';

interface CareerRoleInputProps {
  onGenerateRoadmap: (role: string, skills: string[], experience: string) => void;
  isLoading?: boolean;
}

const CareerRoleInput: React.FC<CareerRoleInputProps> = ({ onGenerateRoadmap, isLoading }) => {
  const [desiredRole, setDesiredRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const popularRoles = [
    'Software Engineer',
    'Data Scientist',
    'UX Designer',
    'Product Manager',
    'DevOps Engineer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Cybersecurity Analyst'
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setCurrentSkills([...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skill));
  };

  const handleGenerateRoadmap = () => {
    if (desiredRole.trim()) {
      onGenerateRoadmap(desiredRole, currentSkills, experience);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-vs-purple-600" />
          What's Your Dream Career Role?
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tell us your desired career role and we'll create a personalized roadmap using AI
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Desired Career Role</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="e.g., Software Engineer, Data Scientist..."
              value={desiredRole}
              onChange={(e) => setDesiredRole(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleGenerateRoadmap} disabled={!desiredRole.trim() || isLoading}>
              <Sparkles className="h-4 w-4 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Roadmap'}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularRoles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="cursor-pointer hover:bg-vs-purple-50 hover:border-vs-purple-200"
                onClick={() => setDesiredRole(role)}
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Current Skills (Optional)</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a skill you already have..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleAddSkill}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Experience Level</label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
              <SelectItem value="some-knowledge">Some Knowledge</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerRoleInput;
