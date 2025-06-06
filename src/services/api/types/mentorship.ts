
import { User } from './user';

export interface MentorshipRequest {
  id: string;
  _id: string;
  studentId?: string;
  mentorId?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  topic: string;
  skills?: string[];
  duration?: string;
  sessionType?: 'one-time' | 'ongoing';
  createdAt: string;
  updatedAt?: string;
  student?: User;
  mentor?: {
    _id: string;
    firstName: string;
    lastName: string;
    organization: string;
    jobTitle: string;
    avatar: string;
  };
  programDetails?: {
    isProgram?: boolean;
    duration: string;
    skillsOffered?: string[];
    maxParticipants: number;
    currentParticipants?: number;
    requirements?: string[];
  };
}

export interface MentorshipProgram {
  _id: string;
  mentor: {
    _id: string;
    firstName: string;
    lastName: string;
    organization: string;
    jobTitle: string;
    avatar: string;
  };
  topic: string;
  message: string;
  programDetails: {
    duration: string;
    skillsOffered: string[];
    maxParticipants: number;
    currentParticipants: number;
    requirements: string[];
  };
  createdAt: string;
}

export interface Mentor {
  _id: string;
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  avatar: string;
  skills: string[];
}
