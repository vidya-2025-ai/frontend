
export interface CertificateUpload {
  file: File;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  description?: string;
}

export interface Certificate {
  id: string;
  _id?: string;
  name: string;
  title?: string; // Alternative property name
  issuingOrganization: string;
  issuer?: string; // Alternative property name
  issuedBy?: string; // Alternative property name
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationLink?: string;
  skills?: string[];
  description?: string;
  fileUrl?: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
