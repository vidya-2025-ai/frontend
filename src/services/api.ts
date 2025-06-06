
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
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

export interface Application {
  id: string;
  opportunity: Opportunity;
  student: User;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  requirements: string[];
  location?: string;
  type: 'Internship' | 'Research' | 'Volunteer' | 'Part-time' | 'Full-time';
  duration: string;
  stipend?: {
    amount: number;
    currency: string;
  };
  deadline?: string;
  skillsRequired: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  skills: string[];
  status: 'In Progress' | 'Completed';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'Interview' | 'Deadline' | 'Event' | 'Meeting' | 'Other';
  description?: string;
  location?: string;
  isCompleted: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  description?: string;
  level?: number;
}

export interface UserSkill {
  id: string;
  skill: Skill;
  level: number;
  assessments: {
    score: number;
    date: string;
    certificate?: Certificate;
  }[];
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
    description?: string;
  }[];
  experience: {
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate: string;
    endDate?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    id?: string;
  }[];
  atsScore?: number;
  lastUpdated: string;
}

export interface ATSParameter {
  id: string;
  name: string;
  requiredSkills: {
    skill: string;
    weight: number;
  }[];
  requiredExperience: number;
  requiredEducation?: string;
  keywords: {
    keyword: string;
    weight: number;
  }[];
  formatRequirements: {
    preferredLength?: number;
    requiresContactInfo: boolean;
    requiresEducation: boolean;
  };
  active: boolean;
  createdAt: string;
}

export interface MentorshipRequest {
  id: string;
  mentor: User;
  student: User;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

export interface PostComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'closed';
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  responses: {
    id: string;
    content: string;
    responder: {
      id: string;
      name: string;
      role: string;
    };
    createdAt: string;
  }[];
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  organization: string;
  skillsRequired: string[];
  deadline: string;
  submissionCount: number;
  createdAt: string;
}

export interface ChallengeSolution {
  id: string;
  challenge: string;
  student: {
    id: string;
    name: string;
  };
  content: string;
  attachments: string[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'evaluated';
  submittedAt: string;
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
}

// Auth Services
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },
  logout: async (): Promise<void> => {
    const response = await api.post<void>('/auth/logout');
    return response.data;
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/users/profile', profileData);
    return response.data;
  }
};

// Applications Services
export const applicationService = {
  getStudentApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/applications/student');
    return response.data;
  },
  getRecruiterApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/applications/recruiter');
    return response.data;
  },
  createApplication: async (applicationData: any): Promise<Application> => {
    const response = await api.post<Application>('/applications', applicationData);
    return response.data;
  },
  updateApplicationStatus: async (id: string, status: string): Promise<Application> => {
    const response = await api.put<Application>(`/applications/${id}/status`, { status });
    return response.data;
  },
  getApplicationDetails: async (id: string): Promise<Application> => {
    const response = await api.get<Application>(`/applications/${id}`);
    return response.data;
  }
};

// Opportunities Services
export const opportunityService = {
  getAllOpportunities: async (filters = {}): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities', { params: filters });
    return response.data;
  },
  getRecruiterOpportunities: async (): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities/recruiter');
    return response.data;
  },
  createOpportunity: async (opportunityData: any): Promise<Opportunity> => {
    const response = await api.post<Opportunity>('/opportunities', opportunityData);
    return response.data;
  },
  getOpportunityById: async (id: string): Promise<Opportunity> => {
    const response = await api.get<Opportunity>(`/opportunities/${id}`);
    return response.data;
  },
  updateOpportunity: async (id: string, opportunityData: any): Promise<Opportunity> => {
    const response = await api.put<Opportunity>(`/opportunities/${id}`, opportunityData);
    return response.data;
  }
};

// Certificates Services
export const certificateService = {
  getAllCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>('/certificates');
    return response.data;
  },
  createCertificate: async (certificateData: any): Promise<Certificate> => {
    const response = await api.post<Certificate>('/certificates', certificateData);
    return response.data;
  },
  getCertificateById: async (id: string): Promise<Certificate> => {
    const response = await api.get<Certificate>(`/certificates/${id}`);
    return response.data;
  },
  updateCertificate: async (id: string, certificateData: any): Promise<Certificate> => {
    const response = await api.put<Certificate>(`/certificates/${id}`, certificateData);
    return response.data;
  }
};

// Calendar Services
export const calendarService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/calendar');
    return response.data;
  },
  createEvent: async (eventData: any): Promise<Event> => {
    const response = await api.post<Event>('/calendar', eventData);
    return response.data;
  },
  updateEvent: async (id: string, eventData: any): Promise<Event> => {
    const response = await api.put<Event>(`/calendar/${id}`, eventData);
    return response.data;
  },
  deleteEvent: async (id: string): Promise<void> => {
    const response = await api.delete<void>(`/calendar/${id}`);
    return response.data;
  }
};

// Skills Services
export const skillService = {
  getAllSkills: async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>('/skills/all');
    return response.data;
  },
  getUserSkills: async (): Promise<UserSkill[]> => {
    const response = await api.get<UserSkill[]>('/skills/user');
    return response.data;
  },
  addUserSkill: async (skillData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>('/skills/user', skillData);
    return response.data;
  },
  addSkillAssessment: async (skillId: string, assessmentData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>(`/skills/user/${skillId}/assessment`, assessmentData);
    return response.data;
  }
};

// Resume Services
export const resumeService = {
  getAllResumes: async (): Promise<Resume[]> => {
    const response = await api.get<Resume[]>('/resume');
    return response.data;
  },
  getResumeById: async (id: string): Promise<Resume> => {
    const response = await api.get<Resume>(`/resume/${id}`);
    return response.data;
  },
  createResume: async (resumeData: any): Promise<Resume> => {
    const response = await api.post<Resume>('/resume', resumeData);
    return response.data;
  },
  updateResume: async (id: string, resumeData: any): Promise<Resume> => {
    const response = await api.put<Resume>(`/resume/${id}`, resumeData);
    return response.data;
  }
};

// ATS Services
export const atsService = {
  getParameters: async (): Promise<ATSParameter[]> => {
    const response = await api.get<ATSParameter[]>('/ats/parameters');
    return response.data;
  },
  createParameters: async (parameterData: any): Promise<ATSParameter> => {
    const response = await api.post<ATSParameter>('/ats/parameters', parameterData);
    return response.data;
  },
  updateParameters: async (id: string, parameterData: any): Promise<ATSParameter> => {
    const response = await api.put<ATSParameter>(`/ats/parameters/${id}`, parameterData);
    return response.data;
  },
  calculateScore: async (resumeId: string, parameterId: string): Promise<{score: number}> => {
    const response = await api.post<{score: number}>('/ats/calculate-score', { resumeId, parameterId });
    return response.data;
  }
};

// Mentorship Services
export const mentorshipService = {
  getAllMentorships: async (): Promise<MentorshipRequest[]> => {
    const response = await api.get<MentorshipRequest[]>('/mentorship');
    return response.data;
  },
  getMyMentorships: async (): Promise<MentorshipRequest[]> => {
    const response = await api.get<MentorshipRequest[]>('/mentorship/my');
    return response.data;
  },
  createMentorshipRequest: async (mentorshipData: any): Promise<MentorshipRequest> => {
    const response = await api.post<MentorshipRequest>('/mentorship/request', mentorshipData);
    return response.data;
  },
  updateMentorshipStatus: async (id: string, status: string): Promise<MentorshipRequest> => {
    const response = await api.put<MentorshipRequest>(`/mentorship/${id}/status`, { status });
    return response.data;
  }
};

// Community Hub Services
export const communityService = {
  getPosts: async (): Promise<CommunityPost[]> => {
    const response = await api.get<CommunityPost[]>('/community/posts');
    return response.data;
  },
  createPost: async (postData: {title: string, content: string}): Promise<CommunityPost> => {
    const response = await api.post<CommunityPost>('/community/posts', postData);
    return response.data;
  },
  getPostComments: async (postId: string): Promise<PostComment[]> => {
    const response = await api.get<PostComment[]>(`/community/posts/${postId}/comments`);
    return response.data;
  },
  addComment: async (postId: string, commentData: {content: string}): Promise<PostComment> => {
    const response = await api.post<PostComment>(`/community/posts/${postId}/comments`, commentData);
    return response.data;
  }
};

// Grievance Services
export const grievanceService = {
  getGrievances: async (): Promise<Grievance[]> => {
    const response = await api.get<Grievance[]>('/grievances');
    return response.data;
  },
  fileGrievance: async (grievanceData: {title: string, description: string}): Promise<Grievance> => {
    const response = await api.post<Grievance>('/grievances', grievanceData);
    return response.data;
  },
  respondToGrievance: async (id: string, responseData: {content: string}): Promise<any> => {
    const response = await api.put<any>(`/grievances/${id}/response`, responseData);
    return response.data;
  },
  closeGrievance: async (id: string): Promise<any> => {
    const response = await api.put<any>(`/grievances/${id}/close`);
    return response.data;
  }
};

// Challenges Services
export const challengeService = {
  getChallenges: async (): Promise<Challenge[]> => {
    const response = await api.get<Challenge[]>('/challenges');
    return response.data;
  },
  createChallenge: async (challengeData: any): Promise<Challenge> => {
    const response = await api.post<Challenge>('/challenges', challengeData);
    return response.data;
  },
  submitSolution: async (challengeId: string, solutionData: any): Promise<ChallengeSolution> => {
    const response = await api.post<ChallengeSolution>(`/challenges/${challengeId}/solutions`, solutionData);
    return response.data;
  },
  evaluateSolution: async (challengeId: string, solutionId: string, evaluationData: any): Promise<ChallengeSolution> => {
    const response = await api.put<ChallengeSolution>(`/challenges/${challengeId}/solutions/${solutionId}/evaluate`, evaluationData);
    return response.data;
  }
};

// Micro-Internship Services
export const microInternshipService = {
  getAllMicroInternships: async (): Promise<MicroInternship[]> => {
    const response = await api.get<MicroInternship[]>('/micro-internships');
    return response.data;
  },
  createMicroInternship: async (internshipData: any): Promise<MicroInternship> => {
    const response = await api.post<MicroInternship>('/micro-internships', internshipData);
    return response.data;
  },
  applyToMicroInternship: async (internshipId: string, applicationData?: any): Promise<MicroInternshipApplication> => {
    const response = await api.post<MicroInternshipApplication>(`/micro-internships/${internshipId}/apply`, applicationData || {});
    return response.data;
  },
  updateMicroInternshipStatus: async (applicationId: string, status: 'accepted' | 'rejected' | 'shortlisted'): Promise<any> => {
    const response = await api.put<any>(`/micro-internships/applications/${applicationId}/status`, { status });
    return response.data;
  }
};

export default api;
