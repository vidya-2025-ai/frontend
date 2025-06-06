
import api from './index';
import { Certificate } from './types';
import { toast } from '@/hooks/use-toast';

export const certificateService = {
  getAllCertificates: async (): Promise<Certificate[]> => {
    try {
      console.log('Fetching certificates...');
      const response = await api.get<Certificate[]>('/certificates');
      console.log('Certificates fetched:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('Error fetching certificates:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to load certificates. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    }
  },
  
  createCertificate: async (certificateData: any): Promise<Certificate> => {
    try {
      console.log('Creating certificate:', certificateData);
      const response = await api.post<Certificate>('/certificates', certificateData);
      console.log('Certificate created:', response.data);
      toast({
        title: "Success",
        description: "Certificate uploaded successfully!",
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating certificate:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || "Failed to upload certificate. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getCertificateById: async (id: string): Promise<Certificate> => {
    try {
      console.log(`Fetching certificate ${id}`);
      const response = await api.get<Certificate>(`/certificates/${id}`);
      console.log('Certificate details:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching certificate details:', error);
      const errorMessage = error.response?.data?.message || "Failed to load certificate details. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  },
  
  updateCertificate: async (id: string, certificateData: any): Promise<Certificate> => {
    try {
      console.log(`Updating certificate ${id}:`, certificateData);
      const response = await api.put<Certificate>(`/certificates/${id}`, certificateData);
      console.log('Certificate updated:', response.data);
      toast({
        title: "Success",
        description: "Certificate updated successfully!",
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating certificate:', error);
      const errorMessage = error.response?.data?.message || "Failed to update certificate. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  }
};

export default certificateService;
