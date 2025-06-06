
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { interviewService, InterviewSchedule } from '@/services/api/interviewService';
import { eventService } from '@/services/api/eventService';
import { Application, User, Opportunity } from '@/services/api/types';

interface ScheduleInterviewDialogProps {
  application: Application;
  trigger?: React.ReactNode;
  onScheduled?: (interview: InterviewSchedule) => void;
}

const ScheduleInterviewDialog: React.FC<ScheduleInterviewDialogProps> = ({
  application,
  trigger,
  onScheduled
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: 60,
    type: 'Technical' as InterviewSchedule['type'],
    location: 'Video Call',
    meetingLink: '',
    notes: ''
  });

  const getCandidateId = (student: string | User): string => {
    if (typeof student === 'string') {
      return student;
    }
    return student?.id || student?._id || '';
  };

  const getCandidateName = (student: string | User): string => {
    if (typeof student === 'object' && student !== null) {
      return `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Unknown Student';
    }
    return 'Unknown Student';
  };

  const getOpportunityTitle = (opportunity: string | Opportunity): string => {
    if (typeof opportunity === 'object' && opportunity !== null) {
      return opportunity.title || 'Position';
    }
    return 'Position';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Schedule the interview
      const interviewData: Omit<InterviewSchedule, 'id'> = {
        applicationId: application.id || application._id || '',
        candidateId: getCandidateId(application.student),
        candidateName: getCandidateName(application.student),
        position: getOpportunityTitle(application.opportunity),
        recruiterId: '', // Will be set by backend from auth
        recruiterName: '', // Will be set by backend from auth
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        status: 'Scheduled',
        type: formData.type,
        location: formData.location,
        meetingLink: formData.meetingLink,
        notes: formData.notes
      };

      const scheduledInterview = await interviewService.scheduleInterview(interviewData);

      // Also create a calendar event
      await eventService.createEvent({
        title: `Interview: ${interviewData.candidateName}`,
        date: formData.date,
        time: formData.time,
        type: 'Interview',
        description: `${formData.type} interview for ${getOpportunityTitle(application.opportunity)}`,
        location: formData.location,
        duration: formData.duration,
        relatedTo: application.id || application._id,
        relatedType: 'Application',
        status: 'Upcoming',
        meetingLink: formData.meetingLink
      });

      if (onScheduled) {
        onScheduled(scheduledInterview);
      }

      setOpen(false);
      
      // Reset form
      setFormData({
        date: '',
        time: '',
        duration: 60,
        type: 'Technical',
        location: 'Video Call',
        meetingLink: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Schedule Interview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Schedule an interview with {getCandidateName(application.student)} for {getOpportunityTitle(application.opportunity)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Interview Type</Label>
              <Select value={formData.type} onValueChange={(value: InterviewSchedule['type']) => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Screening">Screening</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR Round">HR Round</SelectItem>
                  <SelectItem value="Final Round">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration.toString()} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, duration: parseInt(value) }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Video Call, Office, etc."
            />
          </div>

          <div>
            <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
            <Input
              id="meetingLink"
              type="url"
              value={formData.meetingLink}
              onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
              placeholder="https://meet.google.com/..."
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes or instructions..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Scheduling...' : 'Schedule Interview'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewDialog;
