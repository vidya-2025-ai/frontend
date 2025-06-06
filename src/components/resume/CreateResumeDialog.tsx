
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateResumeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateResume: (title: string) => void;
}

const CreateResumeDialog: React.FC<CreateResumeDialogProps> = ({
  isOpen,
  onOpenChange,
  onCreateResume
}) => {
  const [newResumeTitle, setNewResumeTitle] = useState('');

  const handleSubmit = () => {
    onCreateResume(newResumeTitle);
    setNewResumeTitle('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Resume Title</Label>
            <Input 
              id="title"
              placeholder="e.g., Software Developer Resume"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Create Resume
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeDialog;
