
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Download, Copy, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Resume } from '@/services/api/types';

interface ResumeCardProps {
  resume: Resume;
  onEdit: (resume: Resume) => void;
  onDuplicate: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  getExperienceLength: (resume: Resume) => number;
  getEducationLength: (resume: Resume) => number;
  getSkillsLength: (resume: Resume) => number;
  getProjectsLength: (resume: Resume) => number;
  formatDate: (dateString?: string | Date) => string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onEdit,
  onDuplicate,
  onDelete,
  getExperienceLength,
  getEducationLength,
  getSkillsLength,
  getProjectsLength,
  formatDate
}) => {
  const getResumeTitle = (resume: Resume): string => {
    return resume.title || resume.name || 'Untitled Resume';
  };

  const getLastUpdated = (resume: Resume): string => {
    return formatDate(resume.lastUpdated || resume.updatedAt);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{getResumeTitle(resume)}</CardTitle>
        <CardDescription>
          Last updated: {getLastUpdated(resume)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600 mb-4">
          <p>Experience: {getExperienceLength(resume)} entries</p>
          <p>Education: {getEducationLength(resume)} entries</p>
          <p>Skills: {getSkillsLength(resume)} skills</p>
          <p>Projects: {getProjectsLength(resume)} projects</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onEdit(resume)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onDuplicate(resume)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{getResumeTitle(resume)}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(resume)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
