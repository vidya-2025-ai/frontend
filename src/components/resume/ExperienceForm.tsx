
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Experience {
  id?: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: string[];
}

interface ExperienceFormProps {
  initialData?: Experience[];
  onSave: (data: Experience[]) => void;
  onCancel: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialData = [], onSave, onCancel }) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Experience>();
  const watchCurrent = watch('current');

  const handleAddExperience = (data: Experience) => {
    if (editingIndex !== null) {
      const updated = [...experienceList];
      updated[editingIndex] = { ...data, id: updated[editingIndex].id || Date.now().toString() };
      setExperienceList(updated);
      setEditingIndex(null);
    } else {
      setExperienceList([...experienceList, { ...data, id: Date.now().toString() }]);
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const experience = experienceList[index];
    reset(experience);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(experienceList);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button 
          onClick={() => setShowForm(true)} 
          disabled={showForm}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIndex !== null ? 'Edit Experience' : 'Add Experience'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAddExperience)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Job Title <span className="text-red-500">*</span></Label>
                  <Input 
                    id="position" 
                    placeholder="e.g., Software Engineer"
                    {...register('position', { required: 'Job title is required' })}
                  />
                  {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
                </div>
                <div>
                  <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                  <Input 
                    id="company" 
                    placeholder="e.g., Google Inc."
                    {...register('company', { required: 'Company is required' })}
                  />
                  {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g., San Francisco, CA"
                  {...register('location')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date <span className="text-red-500">*</span></Label>
                  <Input 
                    id="startDate" 
                    type="month"
                    {...register('startDate', { required: 'Start date is required' })}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="month"
                    disabled={watchCurrent}
                    {...register('endDate')}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="current"
                  {...register('current')}
                />
                <Label htmlFor="current">Currently working here</Label>
              </div>

              <div>
                <Label htmlFor="description">Job Description & Achievements</Label>
                <Textarea 
                  id="description" 
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 3 developers and improved code quality by 40%&#10;• Implemented automated testing reducing bugs by 60%"
                  {...register('description')}
                  rows={6}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use bullet points (•) to highlight key achievements and responsibilities
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingIndex(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingIndex !== null ? 'Update' : 'Add'} Experience
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {experienceList.map((experience, index) => (
          <Card key={experience.id || index}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{experience.position}</h4>
                  <p className="text-sm text-gray-600">{experience.company}</p>
                  {experience.location && <p className="text-sm text-gray-500">{experience.location}</p>}
                  <p className="text-sm text-gray-500">
                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </p>
                  {experience.description && (
                    <div className="text-sm mt-2 whitespace-pre-line">{experience.description}</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
