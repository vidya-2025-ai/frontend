
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Briefcase, 
  CircleDollarSign, 
  ExternalLink, 
  FileCheck,
  File,
  X,
  Loader2
} from 'lucide-react';
import { opportunityService } from '@/services/api/opportunityService';
import { applicationService } from '@/services/api/applicationService';
import { Opportunity } from '@/services/api/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

const OpportunityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Apply mutation
  const applyMutation = useMutation({
    mutationFn: async (data: { coverLetter: string; resumeUrl?: string }) => {
      if (!opportunity) throw new Error('No opportunity selected');
      
      let finalResumeUrl = data.resumeUrl || '';
      
      if (resumeFile && !resumeUrl) {
        setIsUploading(true);
        try {
          const uploadResult = await applicationService.uploadResumeFile(resumeFile);
          finalResumeUrl = uploadResult.resumeUrl;
          setResumeUrl(finalResumeUrl);
        } catch (error) {
          setIsUploading(false);
          throw error;
        } finally {
          setIsUploading(false);
        }
      }
      
      return applicationService.createApplication(opportunity._id, {
        coverLetter: data.coverLetter,
        resumeUrl: finalResumeUrl
      });
    },
    onSuccess: () => {
      setIsApplicationDialogOpen(false);
      setCoverLetter('');
      setResumeUrl('');
      setResumeFile(null);
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Application submission error:', error);
      const errorMessage = error.response?.data?.message || error.message || "There was a problem submitting your application. Please try again.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await opportunityService.getOpportunityById(id);
        setOpportunity(data);
      } catch (error) {
        console.error('Error fetching opportunity:', error);
        toast({
          title: "Error",
          description: "Failed to load opportunity details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunity();
  }, [id, toast]);

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for opportunities.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setIsApplicationDialogOpen(true);
  };

  const submitApplication = async () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a cover letter.",
        variant: "destructive",
      });
      return;
    }

    applyMutation.mutate({
      coverLetter,
      resumeUrl
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
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
      
      setResumeFile(file);
      setResumeUrl('');
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeUrl('');
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleCheckATSScore = () => {
    if (opportunity) {
      navigate(`/student/ats-calculator?opportunityId=${opportunity._id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Opportunity not found</h2>
          <Button onClick={() => navigate('/student/explore')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Button>
        </div>
      </div>
    );
  }

  const organizationName = typeof opportunity.organization === 'string'
    ? opportunity.organization
    : opportunity.organization?.organization || opportunity.organization?.name || 'Organization';

  // Helper function to get organization website URL
  const getOrganizationWebsite = () => {
    if (typeof opportunity.organization === 'object' && opportunity.organization?.organization) {
      return `https://${opportunity.organization.organization.toLowerCase().replace(/\s+/g, '')}.com`;
    }
    if (typeof opportunity.organization === 'string') {
      return `https://${opportunity.organization.toLowerCase().replace(/\s+/g, '')}.com`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/student/explore')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
                    <p className="text-lg text-gray-600 mt-2">{organizationName}</p>
                  </div>
                  <Badge className="text-sm">
                    {opportunity.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {opportunity.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{opportunity.location}</span>
                    </div>
                  )}
                  {opportunity.deadline && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Due {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{opportunity.duration}</span>
                  </div>
                  {opportunity.stipend && opportunity.stipend.amount > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <CircleDollarSign className="h-4 w-4" />
                      <span>{opportunity.stipend.amount} {opportunity.stipend.currency}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>
                
                {opportunity.requirements && opportunity.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skillsRequired.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCheckATSScore}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Check ATS Score
                </Button>
                
                {getOrganizationWebsite() && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(getOrganizationWebsite(), '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Posted on</p>
                  <p className="font-medium">{new Date(opportunity.createdAt).toLocaleDateString()}</p>
                </div>
                {opportunity.views && (
                  <div>
                    <p className="text-sm text-gray-600">Views</p>
                    <p className="font-medium">{opportunity.views}</p>
                  </div>
                )}
                {opportunity.category && (
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{opportunity.category}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {opportunity.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this opportunity at {organizationName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              {!resumeFile && !resumeUrl ? (
                <div className="space-y-2">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Upload your resume (PDF, DOC, or DOCX, max 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <File className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 flex-1">
                    {resumeFile ? resumeFile.name : 'Resume uploaded'}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                <p>Or provide a link to your existing resume:</p>
                <Input
                  placeholder="https://drive.google.com/your-resume-link"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="mt-1"
                  disabled={!!resumeFile}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell the recruiter why you're interested in this opportunity and why you're a good fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplicationDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitApplication}
              disabled={applyMutation.isPending || isUploading || !coverLetter.trim()}
            >
              {(applyMutation.isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunityDetails;
