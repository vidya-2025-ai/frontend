
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
  location?: string;
}

interface EducationFormProps {
  initialData?: Education[];
  onSave: (data: Education[]) => void;
  onCancel: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ initialData = [], onSave, onCancel }) => {
  const [educationList, setEducationList] = useState<Education[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Education>();
  const watchCurrent = watch('current');

  const handleAddEducation = (data: Education) => {
    if (editingIndex !== null) {
      const updated = [...educationList];
      updated[editingIndex] = { ...data, id: updated[editingIndex].id || Date.now().toString() };
      setEducationList(updated);
      setEditingIndex(null);
    } else {
      setEducationList([...educationList, { ...data, id: Date.now().toString() }]);
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const education = educationList[index];
    reset(education);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(educationList);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button 
          onClick={() => setShowForm(true)} 
          disabled={showForm}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIndex !== null ? 'Edit Education' : 'Add Education'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAddEducation)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institution">Institution <span className="text-red-500">*</span></Label>
                  <Input 
                    id="institution" 
                    {...register('institution', { required: 'Institution is required' })}
                  />
                  {errors.institution && <p className="text-red-500 text-sm">{errors.institution.message}</p>}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...register('location')} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="degree">Degree <span className="text-red-500">*</span></Label>
                  <Input 
                    id="degree" 
                    placeholder="e.g., Bachelor of Science"
                    {...register('degree', { required: 'Degree is required' })}
                  />
                  {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
                </div>
                <div>
                  <Label htmlFor="field">Field of Study <span className="text-red-500">*</span></Label>
                  <Input 
                    id="field" 
                    placeholder="e.g., Computer Science"
                    {...register('field', { required: 'Field of study is required' })}
                  />
                  {errors.field && <p className="text-red-500 text-sm">{errors.field.message}</p>}
                </div>
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
                <Label htmlFor="current">Currently enrolled</Label>
              </div>

              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input 
                  id="gpa" 
                  placeholder="e.g., 3.8/4.0"
                  {...register('gpa')}
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Relevant coursework, achievements, activities..."
                  {...register('description')}
                  rows={3}
                />
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
                  {editingIndex !== null ? 'Update' : 'Add'} Education
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {educationList.map((education, index) => (
          <Card key={education.id || index}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{education.degree} in {education.field}</h4>
                  <p className="text-sm text-gray-600">{education.institution}</p>
                  <p className="text-sm text-gray-500">
                    {education.startDate} - {education.current ? 'Present' : education.endDate}
                  </p>
                  {education.gpa && <p className="text-sm text-gray-500">GPA: {education.gpa}</p>}
                  {education.description && <p className="text-sm mt-2">{education.description}</p>}
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

export default EducationForm;
