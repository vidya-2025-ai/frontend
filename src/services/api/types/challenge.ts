
export interface Challenge {
  id: string;
  _id?: string;
  title: string;
  description: string;
  organization: string;
  organizationName?: string; // Add organizationName for backward compatibility
  skillsRequired: string[];
  skills?: string[]; // Add skills for backward compatibility
  deadline: string;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeSolution {
  id: string;
  _id?: string;
  challenge: string;
  student: {
    id: string;
    name: string;
  };
  content: string;
  attachments: string[];
  repositoryUrl?: string; // Add repositoryUrl property
  score?: number;
  feedback?: string;
  status: 'submitted' | 'evaluated';
  submittedAt: string;
}
