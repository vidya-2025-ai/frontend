
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { resumeService } from '@/services/api/resumeService';
import { Resume } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';
import ResumeCard from '@/components/resume/ResumeCard';
import CreateResumeDialog from '@/components/resume/CreateResumeDialog';
import ResumeUpload from '@/components/resume/ResumeUpload';
import ResumeEditor from '@/components/resume/ResumeEditor';
import ResumeTemplates from '@/components/resume/ResumeTemplates';
import EmptyResumeState from '@/components/resume/EmptyResumeState';

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-resumes");
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [editResume, setEditResume] = useState<Resume | null>(null);
  const { toast } = useToast();

  // Helper functions for safely accessing resume properties
  const getExperienceLength = (resume: Resume) => {
    if (Array.isArray(resume.experience)) return resume.experience.length;
    if (resume.content) {
      const content = resume.content;
      if (typeof content === 'object' && content !== null) {
        const contentObj = content as Record<string, any>;
        if (contentObj.experience && Array.isArray(contentObj.experience)) {
          return contentObj.experience.length;
        }
      }
    }
    return 0;
  };

  const getEducationLength = (resume: Resume) => {
    if (Array.isArray(resume.education)) return resume.education.length;
    if (resume.content) {
      const content = resume.content;
      if (typeof content === 'object' && content !== null) {
        const contentObj = content as Record<string, any>;
        if (contentObj.education && Array.isArray(contentObj.education)) {
          return contentObj.education.length;
        }
      }
    }
    return 0;
  };

  const getSkillsLength = (resume: Resume) => {
    if (Array.isArray(resume.skills)) return resume.skills.length;
    if (resume.content) {
      const content = resume.content;
      if (typeof content === 'object' && content !== null) {
        const contentObj = content as Record<string, any>;
        if (contentObj.skills && Array.isArray(contentObj.skills)) {
          return contentObj.skills.length;
        }
      }
    }
    return 0;
  };

  const getProjectsLength = (resume: Resume) => {
    if (Array.isArray(resume.projects)) return resume.projects.length;
    if (resume.content) {
      const content = resume.content;
      if (typeof content === 'object' && content !== null) {
        const contentObj = content as Record<string, any>;
        if (contentObj.projects && Array.isArray(contentObj.projects)) {
          return contentObj.projects.length;
        }
      }
    }
    return 0;
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoading(true);
        const data = await resumeService.getAllResumes();
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast({
          title: "Error",
          description: "Failed to load resumes. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleCreateResume = async (title: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a resume title",
        variant: "destructive"
      });
      return;
    }

    try {
      const newResumeData = {
        title,
        personalInfo: {
          name: "Your Name",
          email: "your.email@example.com",
          phone: "",
          address: "",
          linkedin: "",
          website: "",
          summary: ""
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: []
      };

      const createdResume = await resumeService.createResume(newResumeData);
      setResumes([...resumes, createdResume]);
      setIsCreatingResume(false);
      
      toast({
        title: "Success",
        description: "New resume created successfully!",
      });

      setEditResume(createdResume);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUploadResume = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploadingResume(true);
      const uploadedResume = await resumeService.uploadResume(file);
      setResumes([...resumes, uploadedResume]);
      
      toast({
        title: "Success",
        description: "Resume uploaded successfully!",
      });

      event.target.value = '';
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Error",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSectionSave = async (sectionData: any, section: string) => {
    if (!editResume) return;

    const updatedData = { ...editResume };
    
    switch (section) {
      case 'personal':
        updatedData.personalInfo = sectionData;
        break;
      case 'education':
        updatedData.education = sectionData;
        break;
      case 'experience':
        updatedData.experience = sectionData;
        break;
      case 'skills':
        updatedData.skills = sectionData.map((skill: any) => skill.name);
        break;
      case 'projects':
        updatedData.projects = sectionData;
        break;
    }

    try {
      const updatedResume = await resumeService.updateResume(editResume._id || editResume.id, updatedData);
      setResumes(resumes.map(r => r._id === (editResume._id || editResume.id) ? updatedResume : r));
      setEditResume(updatedResume);
      
      toast({
        title: "Success",
        description: "Resume updated successfully!",
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      toast({
        title: "Error",
        description: "Failed to update resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateResume = async (resume: Resume) => {
    try {
      const duplicatedData = {
        ...resume,
        title: `${resume.title} (Copy)`
      };
      delete duplicatedData._id;

      const duplicatedResume = await resumeService.createResume(duplicatedData);
      setResumes([...resumes, duplicatedResume]);
      
      toast({
        title: "Success",
        description: "Resume duplicated successfully!",
      });
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteResume = async (resume: Resume) => {
    try {
      await resumeService.deleteResume(resume._id || resume.id);
      setResumes(resumes.filter(r => (r._id || r.id) !== (resume._id || resume.id)));
      
      toast({
        title: "Success",
        description: "Resume deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUseTemplate = (templateName: string) => {
    setIsCreatingResume(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Resume Builder</h1>
            
            <Tabs value={activeTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-resumes" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 border rounded-lg">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-9 w-9 rounded-md" />
                        <Skeleton className="h-9 w-9 rounded-md" />
                        <Skeleton className="h-9 w-9 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Resume Builder</h1>
            <div className="flex gap-2">
              <ResumeUpload 
                isUploading={isUploadingResume}
                onUpload={handleUploadResume}
              />
              <Button onClick={() => setIsCreatingResume(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-resumes" className="mt-4">
              {resumes.length === 0 ? (
                <EmptyResumeState
                  onCreateResume={() => setIsCreatingResume(true)}
                  onUploadResume={() => document.getElementById('upload-resume')?.click()}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((resume) => (
                    <ResumeCard
                      key={resume._id}
                      resume={resume}
                      onEdit={setEditResume}
                      onDuplicate={handleDuplicateResume}
                      onDelete={handleDeleteResume}
                      getExperienceLength={getExperienceLength}
                      getEducationLength={getEducationLength}
                      getSkillsLength={getSkillsLength}
                      getProjectsLength={getProjectsLength}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="templates" className="mt-4">
              <ResumeTemplates onUseTemplate={handleUseTemplate} />
            </TabsContent>
          </Tabs>

          <CreateResumeDialog
            isOpen={isCreatingResume}
            onOpenChange={setIsCreatingResume}
            onCreateResume={handleCreateResume}
          />

          <ResumeEditor
            resume={editResume}
            onClose={() => setEditResume(null)}
            onSave={handleSectionSave}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
