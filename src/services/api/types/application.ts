
import { User } from './user';
import { Opportunity } from './opportunity';

export interface ApplicationReview {
  strengths: string[];
  weaknesses: string[];
  overallAssessment: string;
  recommendationLevel: 'Highly Recommended' | 'Recommended' | 'Neutral' | 'Not Recommended';
  reviewDate?: string;
}

export interface Application {
  id?: string;
  _id?: string;
  opportunity: string | Opportunity;
  student: string | User;
  status: string;
  appliedAt: string;
  appliedDate?: string; // Legacy property for backward compatibility
  resumeUrl?: string;
  coverLetter?: string;
  activities?: Array<{
    type: string;
    description: string;
    date?: string;
  }>;
  studentDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    university?: string;
    course?: string;
    graduationYear?: number;
    skills?: string[];
  };
  matchScore?: number;
  skillMatch?: number;
  interviewDate?: string;
  notes?: string;
  review?: ApplicationReview;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  underReview?: number; // Add underReview for backward compatibility
}
