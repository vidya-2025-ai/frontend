
import { User } from './user';

export interface Opportunity {
  id?: string;
  _id?: string;
  title: string;
  organization?: string | User;
  description: string;
  requirements?: string[];
  location?: string;
  type?: string;
  duration?: string;
  stipend?: {
    amount: number;
    currency: string;
  };
  deadline?: string;
  skillsRequired?: string[];
  tags?: string[];
  isActive?: boolean;
  applications?: string[];
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  experienceLevel?: string;
  applicationCount?: number;
  views?: number;
  applicationStats?: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

export interface MicroInternship {
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

export interface MicroInternshipApplication {
  id: string;
  internshipId: string;
  student: {
    id: string;
    name: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'shortlisted';
  appliedAt: string;
  coverLetter?: string;
  resume?: string;
}
