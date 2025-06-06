import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { atsService } from '@/services/api/atsService';
import { resumeService } from '@/services/api/resumeService';
import { opportunityService } from '@/services/api/opportunityService';
import { Resume, Opportunity } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/hooks/use-toast';
import { FileCheck, AlertCircle, CheckCircle, XCircle, Briefcase } from "lucide-react";

interface ATSScore {
  score: number;
  details?: {
    matched: number;
    total: number;
  };
}

const ATSCalculator = () => {
  const [searchParams] = useSearchParams();
  const opportunityIdFromUrl = searchParams.get('opportunityId');

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedResume, setSelectedResume] = useState<string>('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');
  const [score, setScore] = useState<ATSScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching resumes and opportunities...');
        
        // Fetch resumes
        const resumesData = await resumeService.getAllResumes();
        console.log('Resumes fetched:', resumesData);
        setResumes(resumesData);

        // Fetch opportunities
        const opportunitiesData = await opportunityService.getAllOpportunities();
        console.log('Opportunities fetched:', opportunitiesData);
        setOpportunities(opportunitiesData);
        
        // If opportunity ID is provided in URL, set it as selected
        if (opportunityIdFromUrl) {
          setSelectedOpportunity(opportunityIdFromUrl);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load necessary data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [opportunityIdFromUrl]);

  const handleCalculateScore = async () => {
    if (!selectedResume || !selectedOpportunity) {
      toast({
        title: "Error",
        description: "Please select both a resume and an opportunity",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCalculating(true);
      console.log('Calculating ATS score for resume:', selectedResume, 'opportunity:', selectedOpportunity);
      
      // Use the opportunity-based calculation
      const result = await atsService.calculateScoreForOpportunity(selectedResume, selectedOpportunity);
      console.log('ATS score result:', result);
      setScore(result);
      
      toast({
        title: "Success",
        description: "ATS score calculated successfully!",
      });
    } catch (error) {
      console.error('Error calculating ATS score:', error);
      toast({
        title: "Error",
        description: "Failed to calculate ATS score. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const renderScoreFeedback = (score: number) => {
    if (score >= 80) {
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Excellent match! Your resume is well-aligned with this opportunity.</span>
        </div>
      );
    } else if (score >= 60) {
      return (
        <div className="flex items-center text-amber-600">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>Good match, but there's room for improvement.</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600">
          <XCircle className="mr-2 h-5 w-5" />
          <span>Your resume needs significant improvements to match this opportunity.</span>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">ATS Score Calculator</h1>
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-full" /></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">ATS Score Calculator</h1>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your ATS Score</CardTitle>
                <CardDescription>
                  See how well your resume matches specific opportunities by calculating your ATS score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Select Resume</label>
                    <Select
                      value={selectedResume}
                      onValueChange={setSelectedResume}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a resume" />
                      </SelectTrigger>
                      <SelectContent>
                        {resumes.length === 0 ? (
                          <SelectItem value="no_resumes" disabled>No resumes available</SelectItem>
                        ) : (
                          resumes.map((resume) => (
                            <SelectItem key={resume._id || resume.id} value={resume._id || resume.id}>
                              {resume.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Select Opportunity</label>
                    <Select
                      value={selectedOpportunity}
                      onValueChange={setSelectedOpportunity}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an opportunity" />
                      </SelectTrigger>
                      <SelectContent>
                        {opportunities.length === 0 ? (
                          <SelectItem value="no_opportunities" disabled>No opportunities available</SelectItem>
                        ) : (
                          opportunities.map((opportunity) => (
                            <SelectItem key={opportunity._id || opportunity.id} value={opportunity._id || opportunity.id}>
                              {opportunity.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleCalculateScore}
                    disabled={isCalculating || !selectedResume || !selectedOpportunity}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Score'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {score && (
            <Card>
              <CardHeader>
                <CardTitle>Your ATS Score</CardTitle>
                <CardDescription>
                  How well your resume matches the selected opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Match Score</span>
                      <span className="font-semibold">{score.score}%</span>
                    </div>
                    <Progress value={score.score} className="h-2" />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    {renderScoreFeedback(score.score)}
                  </div>

                  {score.details && (
                    <div>
                      <h4 className="font-medium mb-2">Score Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Matched Criteria</span>
                          <span>{score.details.matched} of {score.details.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Match Rate</span>
                          <span>{Math.round((score.details.matched / score.details.total) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Include more relevant keywords mentioned in the opportunity description</li>
                      <li>Format your resume with clear sections and consistent styling</li>
                      <li>Quantify achievements with specific numbers and metrics</li>
                      <li>Customize your resume for this specific opportunity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!score && !isCalculating && !isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <Briefcase className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Score Available</h3>
                <p className="text-gray-500 mb-4">
                  Select a resume and opportunity above to calculate your ATS score
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSCalculator;
