
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  [key: string]: any; // For additional properties like grievances, applications, etc.
}

export interface ATSParameter {
  id: string;
  _id?: string;
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

export interface Event {
  id: string;
  _id?: string;
  title: string;
  date: string;
  time?: string;
  type: 'Interview' | 'Deadline' | 'Event' | 'Meeting' | 'Other';
  description?: string;
  location?: string;
  isCompleted: boolean;
  duration?: number;
  relatedTo?: string;
  relatedType?: string;
  status?: string;
  meetingLink?: string;
}
