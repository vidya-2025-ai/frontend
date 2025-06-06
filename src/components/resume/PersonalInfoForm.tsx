
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

interface PersonalInfoFormProps {
  initialData?: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
  onCancel: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      summary: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input 
            id="email" 
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register('phone')} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" {...register('linkedin')} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register('address')} />
      </div>
      
      <div>
        <Label htmlFor="website">Website/Portfolio</Label>
        <Input id="website" {...register('website')} />
      </div>
      
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea 
          id="summary" 
          placeholder="Brief overview of your professional background and career objectives..."
          {...register('summary')}
          rows={4}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
