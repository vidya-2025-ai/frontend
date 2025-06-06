

export interface User {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  organization?: string;
  university?: string;
  course?: string;
  graduationYear?: number;
  skills?: string[];
  createdAt: string;
  avatar?: string;
  jobTitle?: string;
  availability?: string;
  yearsOfExperience?: number;
  bio?: string; // Add bio property
  education?: {
    degree: string;
    institution: string;
    field: string; // Add field property
    graduationYear: number;
  }[];
  name?: string; // For backward compatibility
}

export interface CandidateWithResume extends User {
  resumeUrl?: string;
  matchScore?: number;
  lastActive?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
