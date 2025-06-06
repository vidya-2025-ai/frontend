
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  isUploading: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  isUploading,
  onUpload
}) => {
  return (
    <div className="relative">
      <input
        type="file"
        id="upload-resume"
        accept=".pdf,.doc,.docx"
        onChange={onUpload}
        className="hidden"
        disabled={isUploading}
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById('upload-resume')?.click()}
        disabled={isUploading}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload Resume'}
      </Button>
    </div>
  );
};

export default ResumeUpload;
