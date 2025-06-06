
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import MobileMenuToggle from '@/components/layout/MobileMenuToggle';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, MapPin, Briefcase, Tags, DollarSign } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { opportunityService, microInternshipService } from '@/services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PostInternship = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: '',
    duration: '',
    stipendAmount: '',
    stipendCurrency: 'INR',
    deadline: null as Date | null,
    skillsRequired: '',
    tags: ''
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, deadline: date || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Check if it's a micro-internship
      if (formData.type === 'Micro-Internship') {
        // Format the data for micro-internship API
        const microInternshipData = {
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()),
          stipendAmount: parseInt(formData.stipendAmount) || 0,
          stipendCurrency: formData.stipendCurrency,
          deadline: formData.deadline
        };
        
        await microInternshipService.createMicroInternship(microInternshipData);
        
        toast({
          title: "Micro-Internship Posted!",
          description: "Your micro-internship has been successfully posted."
        });
      } else {
        // Format the data for regular opportunity API
        const opportunityData = {
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements.split('\n').filter(r => r.trim()),
          location: formData.location,
          type: formData.type,
          duration: formData.duration,
          stipend: {
            amount: parseInt(formData.stipendAmount) || 0,
            currency: formData.stipendCurrency
          },
          deadline: formData.deadline,
          skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()),
          tags: formData.tags.split(',').map(t => t.trim())
        };
        
        await opportunityService.createOpportunity(opportunityData);
        
        toast({
          title: "Opportunity Posted!",
          description: "Your opportunity has been successfully posted."
        });
      }
      
      navigate('/recruiter/jobs');
    } catch (error: any) {
      console.error('Error posting opportunity:', error);
      toast({
        title: "Failed to Post Opportunity",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {!isMobileMenuOpen && (
        <MobileMenuToggle onClick={toggleMobileMenu} />
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Post New Opportunity</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Fill in the details to create a new opportunity for students
                </p>
              </div>
            </div>
            
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Opportunity Details</CardTitle>
                  <CardDescription>
                    Enter the basic details about this opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Opportunity Title <span className="text-red-500">*</span></Label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer Intern"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide a detailed description of the opportunity"
                      className="min-h-32 w-full"
                      required
                    />
                  </div>
                  
                  {/* Requirements */}
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements (One per line)</Label>
                    <Textarea 
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="e.g. Strong knowledge of JavaScript"
                      className="min-h-24 w-full"
                    />
                  </div>
                  
                  {/* Type and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Opportunity Type <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Micro-Internship">Micro-Internship</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Volunteer">Volunteer</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Remote, New Delhi, Hybrid"
                          className="pl-10 w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration and Deadline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          placeholder="e.g. 3 months, 6 weeks"
                          className="pl-10 w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.deadline && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.deadline ? format(formData.deadline, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.deadline || undefined}
                            onSelect={handleDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  {/* Stipend */}
                  <div className="space-y-2">
                    <Label htmlFor="stipend">Stipend</Label>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-3 relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="stipendAmount"
                          name="stipendAmount"
                          value={formData.stipendAmount}
                          onChange={handleChange}
                          type="number"
                          placeholder="Amount"
                          className="pl-10 w-full"
                        />
                      </div>
                      <div className="col-span-2">
                        <Select 
                          value={formData.stipendCurrency} 
                          onValueChange={(value) => handleSelectChange('stipendCurrency', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills and Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skillsRequired">Required Skills (comma separated)</Label>
                      <Input 
                        id="skillsRequired"
                        name="skillsRequired"
                        value={formData.skillsRequired}
                        onChange={handleChange}
                        placeholder="e.g. React, JavaScript, UI Design"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <div className="relative">
                        <Tags className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          placeholder="e.g. Remote, Tech, Beginner-friendly"
                          className="pl-10 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate('/recruiter/jobs')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Opportunity"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
