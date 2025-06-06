
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Resume } from '@/services/api/types';
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import ResumePreview from '@/components/resume/ResumePreview';

interface ResumeEditorProps {
  resume: Resume | null;
  onClose: () => void;
  onSave: (sectionData: any, section: string) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onClose,
  onSave
}) => {
  const [editSection, setEditSection] = useState<string>('personal');
  const [showPreview, setShowPreview] = useState(false);

  const handleSectionSave = async (sectionData: any) => {
    onSave(sectionData, editSection);
  };

  if (!resume) return null;

  const getResumeTitle = (resume: Resume): string => {
    return resume.title || resume.name || 'Untitled Resume';
  };

  if (showPreview) {
    return (
      <Dialog open={true} onOpenChange={() => setShowPreview(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Resume Preview: {getResumeTitle(resume)}
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <ResumePreview resume={resume} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={!!resume} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Resume: {getResumeTitle(resume)}
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview Resume
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <Tabs value={editSection} onValueChange={setEditSection} className="flex-1 flex flex-col">
            <TabsList className="mb-4 flex-shrink-0">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto min-h-0">
              <TabsContent value="personal" className="mt-0 h-full">
                <div className="max-h-full overflow-y-auto pr-2">
                  <PersonalInfoForm
                    initialData={resume.personalInfo}
                    onSave={handleSectionSave}
                    onCancel={onClose}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="mt-0 h-full">
                <div className="max-h-full overflow-y-auto pr-2">
                  <EducationForm
                    initialData={resume.education}
                    onSave={handleSectionSave}
                    onCancel={onClose}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-0 h-full">
                <div className="max-h-full overflow-y-auto pr-2">
                  <ExperienceForm
                    initialData={resume.experience}
                    onSave={handleSectionSave}
                    onCancel={onClose}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="mt-0 h-full">
                <div className="max-h-full overflow-y-auto pr-2">
                  <SkillsForm
                    initialData={resume.skills}
                    onSave={handleSectionSave}
                    onCancel={onClose}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-0 h-full">
                <div className="max-h-full overflow-y-auto pr-2">
                  <ProjectsForm
                    initialData={resume.projects.map(project => ({
                      ...project,
                      title: project.title || project.name,
                      status: (project.status as 'Completed' | 'In Progress' | 'On Hold') || 'Completed'
                    }))}
                    onSave={handleSectionSave}
                    onCancel={onClose}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeEditor;
