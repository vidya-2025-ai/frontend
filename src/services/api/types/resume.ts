
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary?: string; // Add missing summary property
}

export interface Experience {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Project {
  name: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  link?: string;
  github?: string;
  githubLink?: string;
  startDate: string;
  endDate?: string;
  status?: 'Completed' | 'In Progress' | 'On Hold';
}

export interface Resume {
  id: string;
  _id?: string;
  userId: string;
  title: string;
  name?: string; // For backward compatibility
  content?: any; // Add content property for backward compatibility
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications?: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
  template: string;
  createdAt: string;
  updatedAt: string;
  lastUpdated?: string; // For backward compatibility
}
