
export interface GrievanceResponse {
  id: string;
  _id?: string;
  content: string;
  responder: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

export interface Grievance {
  id: string;
  _id?: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'closed' | 'open' | 'under-review'; // Add missing status values
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  responses: GrievanceResponse[];
  createdAt: string;
  updatedAt: string;
}
