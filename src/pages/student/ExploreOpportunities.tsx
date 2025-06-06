import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, MapPin, Calendar, Briefcase, CheckCircle2, CircleDollarSign, FileCheck, Loader2, File, X, Eye } from "lucide-react";
import { opportunityService } from '@/services/api/opportunityService';
import { Opportunity } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { applicationService } from '@/services/api/applicationService';
import { useMutation } from '@tanstack/react-query';

const ExploreOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Application dialog state
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Apply mutation with improved error handling
  const applyMutation = useMutation({
    mutationFn: async (data: { coverLetter: string; resumeUrl?: string }) => {
      if (!selectedOpportunity) throw new Error('No opportunity selected');
      
      let finalResumeUrl = data.resumeUrl || '';
      
      // If there's a file to upload, upload it first
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
      
      return applicationService.createApplication(selectedOpportunity._id, {
        coverLetter: data.coverLetter,
        resumeUrl: finalResumeUrl
      });
    },
    onSuccess: () => {
      setIsApplicationDialogOpen(false);
      setCoverLetter('');
      setResumeUrl('');
      setResumeFile(null);
      setSelectedOpportunity(null);
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

  const skillOptions = [
    "React", "JavaScript", "TypeScript", "Node.js", 
    "Python", "Data Analysis", "Machine Learning", 
    "UI/UX Design", "Marketing", "Research"
  ];

  // Industry domains for filter dropdown
  const industryDomains = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media & Entertainment",
    "Real Estate",
    "Transportation",
    "Energy",
    "Telecommunications",
    "Agriculture",
    "Construction",
    "Hospitality",
    "Government",
    "Non-Profit",
    "Automotive",
    "Aerospace",
    "Biotechnology",
    "Pharmaceuticals",
    "Insurance",
    "Banking",
    "E-commerce",
    "Gaming",
    "Food & Beverage",
    "Fashion",
    "Sports",
    "Environmental",
    "Legal Services",
    "Architecture",
    "Design",
    "Marketing & Advertising",
    "Human Resources",
    "Supply Chain",
    "Logistics",
    "Cybersecurity",
    "Artificial Intelligence",
    "Blockchain",
    "Cloud Computing",
    "Social Media"
  ];

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoading(true);
        
        // Build filter object
        const filters: Record<string, any> = {};
        if (searchTerm) filters.search = searchTerm;
        if (selectedType && selectedType !== 'all') filters.type = selectedType;
        if (selectedCategory && selectedCategory !== 'all') filters.category = selectedCategory;
        if (selectedSkills.length > 0) filters.skills = selectedSkills;
        
        const data = await opportunityService.getAllOpportunities(filters);
        setOpportunities(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setError('Failed to load opportunities');
        toast({
          title: "Error",
          description: "Failed to load opportunities. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, [searchTerm, selectedType, selectedCategory, selectedSkills, toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will handle the search due to searchTerm dependency
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Add function to check ATS score for an opportunity
  const handleCheckATSScore = (opportunityId: string) => {
    navigate(`/student/ats-calculator?opportunityId=${opportunityId}`);
  };

  // View details function
  const handleViewDetails = (opportunityId: string) => {
    navigate(`/student/opportunity/${opportunityId}`);
  };

  // Open application dialog
  const handleApply = (opportunity: Opportunity) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for opportunities.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setSelectedOpportunity(opportunity);
    setIsApplicationDialogOpen(true);
  };

  // Submit application
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
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setResumeFile(file);
      setResumeUrl(''); // Clear any existing URL
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeUrl('');
    // Reset the file input
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-4">
              <BackButton to="/student/dashboard" />
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Opportunities</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Discover and apply for internships, research positions, and more
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      className="pl-10"
                      placeholder="Search opportunities by title or description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Opportunity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry Domain" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="all">All Industries</SelectItem>
                    {industryDomains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filter By Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`skill-${skill}`} 
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Opportunities List */}
              <div className="md:col-span-3">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-2/3 mb-2" />
                          <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-16 w-full mb-4" />
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                          </div>
                          <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-28" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <Card className="text-center p-8">
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-gray-600">Please try again later</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </Card>
                ) : opportunities.length === 0 ? (
                  <Card className="text-center p-8">
                    <p className="text-lg font-semibold mb-2">No opportunities found</p>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opportunity) => (
                      <Card key={opportunity._id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between">
                            <div>
                              <CardTitle>{opportunity.title}</CardTitle>
                              <CardDescription>
                                {typeof opportunity.organization === 'string'
                                  ? opportunity.organization
                                  : opportunity.organization?.organization || opportunity.organization?.name || 'Organization'}
                              </CardDescription>
                            </div>
                            <Badge>
                              {opportunity.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {opportunity.description}
                          </p>
                          
                          {/* Skills Tags */}
                          {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {opportunity.skillsRequired.map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            {opportunity.location && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{opportunity.location}</span>
                              </div>
                            )}
                            {opportunity.deadline && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Due {new Date(opportunity.deadline).toLocaleDateString()}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-500">
                              <Briefcase className="h-4 w-4" />
                              <span>{opportunity.duration}</span>
                            </div>
                            {opportunity.stipend && opportunity.stipend.amount > 0 && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <CircleDollarSign className="h-4 w-4" />
                                <span>{opportunity.stipend.amount} {opportunity.stipend.currency}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                              Posted on {new Date(opportunity.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewDetails(opportunity._id)}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleCheckATSScore(opportunity._id)}
                                className="flex items-center gap-1"
                              >
                                <FileCheck className="h-4 w-4" />
                                Check ATS Score
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleApply(opportunity)}
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this opportunity at {
                typeof selectedOpportunity?.organization === 'string'
                  ? selectedOpportunity?.organization
                  : selectedOpportunity?.organization?.organization || selectedOpportunity?.organization?.name || 'Organization'
              }
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

export default ExploreOpportunities;
