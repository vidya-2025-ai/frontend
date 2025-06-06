
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  proficiency: string;
}

interface SkillsFormProps {
  initialData?: string[];
  onSave: (data: Skill[]) => void;
  onCancel: () => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ initialData = [], onSave, onCancel }) => {
  const [skills, setSkills] = useState<Skill[]>(
    initialData.map(skill => ({
      name: skill,
      category: 'Technical',
      proficiency: 'Intermediate'
    }))
  );
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Skill>();
  const watchCategory = watch('category');
  const watchProficiency = watch('proficiency');

  const skillCategories = [
    'Technical',
    'Programming Languages',
    'Frameworks & Libraries',
    'Tools & Software',
    'Databases',
    'Soft Skills',
    'Languages',
    'Certifications'
  ];

  const proficiencyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const handleAddSkill = (data: Skill) => {
    setSkills([...skills, data]);
    reset();
    setShowForm(false);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(skills);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills</h3>
        <Button 
          onClick={() => setShowForm(true)} 
          disabled={showForm}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAddSkill)} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  placeholder="e.g., React, JavaScript, Project Management"
                  {...register('name', { required: 'Skill name is required' })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="proficiency">Proficiency Level</Label>
                  <Select onValueChange={(value) => setValue('proficiency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Skill</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => {
                  const skillIndex = skills.findIndex(s => s.name === skill.name && s.category === skill.category);
                  return (
                    <Badge 
                      key={`${skill.name}-${index}`} 
                      variant="secondary" 
                      className="flex items-center gap-2"
                    >
                      {skill.name} ({skill.proficiency})
                      <button 
                        onClick={() => handleRemoveSkill(skillIndex)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No skills added yet. Add your first skill to get started.</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SkillsForm;
