
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { applicationService } from '@/services/api/applicationService';
import { useToast } from '@/hooks/use-toast';
import { Application } from '@/services/api/types';
import ScheduleInterviewDialog from './ScheduleInterviewDialog';
import { Calendar } from 'lucide-react';

interface ApplicationStatusUpdateProps {
  application: Application;
  onStatusUpdated?: (updatedApplication: Application) => void;
  variant?: 'default' | 'compact';
}

const ApplicationStatusUpdate: React.FC<ApplicationStatusUpdateProps> = ({ 
  application, 
  onStatusUpdated,
  variant = 'default'
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<Application['status']>(application.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Shortlisted', label: 'Shortlisted' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;
    
    const typedStatus = newStatus as Application['status'];
    setStatus(typedStatus);
    
    // If status is changed to Shortlisted or Interview, show scheduling dialog
    if (typedStatus === 'Shortlisted' || typedStatus === 'Interview') {
      setShowScheduleDialog(true);
    }
    
    if (variant === 'compact') {
      await updateStatus(typedStatus);
    }
  };

  const updateStatus = async (statusToUpdate: Application['status']) => {
    try {
      setIsSubmitting(true);
      
      const updatedApplication = await applicationService.updateApplicationStatus(
        application.id || application._id || '',
        statusToUpdate
      );
      
      toast({
        title: "Status Updated",
        description: `Application status updated to ${statusToUpdate}`,
      });
      
      if (onStatusUpdated) {
        onStatusUpdated(updatedApplication);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
      setStatus(application.status);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterviewScheduled = () => {
    setShowScheduleDialog(false);
    // Update status if not already Interview
    if (status !== 'Interview') {
      updateStatus('Interview');
    }
  };

  return (
    <>
      {variant === 'compact' ? (
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(status === 'Shortlisted' || status === 'Interview') && (
            <ScheduleInterviewDialog
              application={application}
              onScheduled={handleInterviewScheduled}
              trigger={
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              }
            />
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Select 
            value={status} 
            onValueChange={(value: string) => {
              setStatus(value as Application['status']);
            }} 
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={() => updateStatus(status)}
            disabled={status === application.status || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
          {(status === 'Shortlisted' || status === 'Interview') && (
            <ScheduleInterviewDialog
              application={application}
              onScheduled={handleInterviewScheduled}
            />
          )}
        </div>
      )}

      {showScheduleDialog && (
        <ScheduleInterviewDialog
          application={application}
          onScheduled={handleInterviewScheduled}
        />
      )}
    </>
  );
};

export default ApplicationStatusUpdate;
