
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Application, ApplicationReview } from '@/services/api/types';
import { applicationService } from '@/services/api/applicationService';

interface ApplicationReviewProps {
  application: Application;
  onReviewAdded?: (updatedApplication: Application) => void;
}

const ApplicationReviewComponent: React.FC<ApplicationReviewProps> = ({ 
  application,
  onReviewAdded 
}) => {
  const [strengths, setStrengths] = useState<string[]>(
    application.review?.strengths || ['']
  );
  const [weaknesses, setWeaknesses] = useState<string[]>(
    application.review?.weaknesses || ['']
  );
  const [overallAssessment, setOverallAssessment] = useState<string>(
    application.review?.overallAssessment || ''
  );
  const [recommendationLevel, setRecommendationLevel] = useState<ApplicationReview['recommendationLevel']>(
    application.review?.recommendationLevel || 'Neutral'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStrength = () => {
    setStrengths([...strengths, '']);
  };

  const handleAddWeakness = () => {
    setWeaknesses([...weaknesses, '']);
  };

  const handleStrengthChange = (index: number, value: string) => {
    const newStrengths = [...strengths];
    newStrengths[index] = value;
    setStrengths(newStrengths);
  };

  const handleWeaknessChange = (index: number, value: string) => {
    const newWeaknesses = [...weaknesses];
    newWeaknesses[index] = value;
    setWeaknesses(newWeaknesses);
  };

  const handleRemoveStrength = (index: number) => {
    const newStrengths = strengths.filter((_, i) => i !== index);
    setStrengths(newStrengths.length ? newStrengths : ['']);
  };

  const handleRemoveWeakness = (index: number) => {
    const newWeaknesses = weaknesses.filter((_, i) => i !== index);
    setWeaknesses(newWeaknesses.length ? newWeaknesses : ['']);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Filter out empty values
      const filteredStrengths = strengths.filter(s => s.trim() !== '');
      const filteredWeaknesses = weaknesses.filter(w => w.trim() !== '');
      
      if (!filteredStrengths.length || !filteredWeaknesses.length || !overallAssessment.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const reviewData: ApplicationReview = {
        strengths: filteredStrengths,
        weaknesses: filteredWeaknesses,
        overallAssessment,
        recommendationLevel
      };

      const updatedApplication = await applicationService.addReview(
        application.id || application._id || '',
        reviewData
      );

      toast({
        title: "Review Added",
        description: "Your review has been successfully added to this application.",
      });

      if (onReviewAdded) {
        onReviewAdded(updatedApplication);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Candidate Strengths</h3>
          <div className="space-y-2">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Enter a strength"
                  value={strength}
                  onChange={(e) => handleStrengthChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveStrength(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddStrength}
            >
              Add Strength
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Areas for Improvement</h3>
          <div className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Enter an area for improvement"
                  value={weakness}
                  onChange={(e) => handleWeaknessChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveWeakness(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddWeakness}
            >
              Add Area for Improvement
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Overall Assessment</h3>
          <Textarea
            placeholder="Enter your overall assessment"
            value={overallAssessment}
            onChange={(e) => setOverallAssessment(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Recommendation Level</h3>
          <Select
            value={recommendationLevel}
            onValueChange={(value) => 
              setRecommendationLevel(value as ApplicationReview['recommendationLevel'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select recommendation level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Highly Recommended">Highly Recommended</SelectItem>
              <SelectItem value="Recommended">Recommended</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Not Recommended">Not Recommended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplicationReviewComponent;
