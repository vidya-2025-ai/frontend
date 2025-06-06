
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, PlusCircle, Upload } from "lucide-react";

interface EmptyResumeStateProps {
  onCreateResume: () => void;
  onUploadResume: () => void;
}

const EmptyResumeState: React.FC<EmptyResumeStateProps> = ({
  onCreateResume,
  onUploadResume
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center text-center p-6">
        <FileCheck className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
        <p className="text-gray-500 mb-4">Create your first resume or upload an existing one</p>
        <div className="flex gap-2">
          <Button onClick={onCreateResume}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Resume
          </Button>
          <Button variant="outline" onClick={onUploadResume}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyResumeState;
