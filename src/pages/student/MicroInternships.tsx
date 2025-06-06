
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { microInternshipService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface MicroInternship {
  id: string;
  title: string;
  description: string;
  organization: string;
  duration: string;
  skillsRequired: string[];
  stipend: {
    amount: number;
    currency: string;
  };
  deadline: string;
  applicants: number;
  createdAt: string;
}

const MicroInternships: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedInternship, setSelectedInternship] = useState<MicroInternship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Fetch all micro-internships
  const { data: microInternships, isLoading, error } = useQuery({
    queryKey: ['microInternships'],
    queryFn: microInternshipService.getAllMicroInternships,
  });

  // Apply to micro-internship mutation
  const applyMutation = useMutation({
    mutationFn: (internshipId: string) => 
      microInternshipService.applyToMicroInternship(internshipId),
    onSuccess: () => {
      setIsDialogOpen(false);
      setCoverLetter('');
      queryClient.invalidateQueries({ queryKey: ['microInternships'] });
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.response?.data?.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle apply button click
  const handleApply = (internship: MicroInternship) => {
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "Please log in to apply for micro-internships.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedInternship(internship);
    setIsDialogOpen(true);
  };

  // Submit application
  const submitApplication = () => {
    if (!selectedInternship) return;
    applyMutation.mutate(selectedInternship.id);
  };

  // Format deadline date
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Remaining days calculation
  const getRemainingDays = (deadlineString: string) => {
    const deadline = new Date(deadlineString);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Micro-Internships
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Short-term projects to gain practical experience
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center p-8 text-red-500">
                Failed to load micro-internships. Please try again.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {microInternships?.map((internship: MicroInternship) => (
                  <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{internship.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{internship.organization}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {internship.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
                        {internship.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Skills Required</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {internship.skillsRequired.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Stipend</p>
                            <p className="font-medium">
                              {internship.stipend.amount > 0 
                                ? `${internship.stipend.amount} ${internship.stipend.currency}` 
                                : 'Unpaid'}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                            <p className="font-medium">{formatDeadline(internship.deadline)}</p>
                            <p className="text-xs text-amber-600">
                              {getRemainingDays(internship.deadline)} days remaining
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2">
                      <p className="text-xs text-gray-500">
                        {internship.applicants} {internship.applicants === 1 ? 'applicant' : 'applicants'}
                      </p>
                      <Button onClick={() => handleApply(internship)}>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {microInternships?.length === 0 && (
                  <div className="col-span-full text-center p-12 border rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">No micro-internships available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedInternship?.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this micro-internship at {selectedInternship?.organization}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Cover Letter</h4>
              <Textarea
                placeholder="Tell the recruiter why you're interested in this opportunity..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={submitApplication}
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MicroInternships;
