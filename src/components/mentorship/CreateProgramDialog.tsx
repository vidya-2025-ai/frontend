
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mentorshipService } from '@/services/api/mentorshipService';

interface CreateProgramDialogProps {
  onProgramCreated?: () => void;
}

const CreateProgramDialog: React.FC<CreateProgramDialogProps> = ({ onProgramCreated }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    maxParticipants: 10,
    skillsOffered: [] as string[],
    requirements: [] as string[]
  });
  const [newSkill, setNewSkill] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skillsOffered.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(s => s !== skill)
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r !== requirement)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await mentorshipService.createMentorshipProgram(formData);
      
      toast({
        title: "Success",
        description: "Mentorship program created successfully!",
      });

      setOpen(false);
      setFormData({
        title: '',
        description: '',
        duration: '',
        maxParticipants: 10,
        skillsOffered: [],
        requirements: []
      });

      if (onProgramCreated) {
        onProgramCreated();
      }
    } catch (error) {
      console.error('Error creating program:', error);
      toast({
        title: "Error",
        description: "Failed to create mentorship program. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Mentorship Program</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Mentorship Program</DialogTitle>
          <DialogDescription>
            Create a mentorship program that students can apply to join.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Program Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Full-Stack Development Mentorship"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what students will learn and achieve..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 3 months, 6 weeks"
                required
              />
            </div>
            <div>
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                value={formData.maxParticipants}
                onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 10 }))}
                required
              />
            </div>
          </div>

          <div>
            <Label>Skills Offered</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <Button type="button" onClick={handleAddSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillsOffered.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Requirements (Optional)</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
              />
              <Button type="button" onClick={handleAddRequirement} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((requirement) => (
                <Badge key={requirement} variant="outline" className="flex items-center gap-1">
                  {requirement}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveRequirement(requirement)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Program'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProgramDialog;
