
import axios from 'axios';

const API_URL = 'https://backend-xdjn.onrender.com/api';

// Create axios instance
const api = axios.create({
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

// Auth Services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  }
};

// Applications Services
export const applicationService = {
  getStudentApplications: async () => {
    const response = await api.get('/applications/student');
    return response.data;
  },
  getRecruiterApplications: async () => {
    const response = await api.get('/applications/recruiter');
    return response.data;
  },
  createApplication: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },
  updateApplicationStatus: async (id, status) => {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  },
  getApplicationDetails: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  }
};

// Opportunities Services
export const opportunityService = {
  getAllOpportunities: async (filters = {}) => {
    const response = await api.get('/opportunities', { params: filters });
    return response.data;
  },
  getRecruiterOpportunities: async () => {
    const response = await api.get('/opportunities/recruiter');
    return response.data;
  },
  createOpportunity: async (opportunityData) => {
    const response = await api.post('/opportunities', opportunityData);
    return response.data;
  },
  getOpportunityById: async (id) => {
    const response = await api.get(`/opportunities/${id}`);
    return response.data;
  },
  updateOpportunity: async (id, opportunityData) => {
    const response = await api.put(`/opportunities/${id}`, opportunityData);
    return response.data;
  }
};

// Certificates Services
export const certificateService = {
  getAllCertificates: async () => {
    const response = await api.get('/certificates');
    return response.data;
  },
  createCertificate: async (certificateData) => {
    const response = await api.post('/certificates', certificateData);
    return response.data;
  },
  getCertificateById: async (id) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },
  updateCertificate: async (id, certificateData) => {
    const response = await api.put(`/certificates/${id}`, certificateData);
    return response.data;
  }
};

// Calendar Services
export const calendarService = {
  getAllEvents: async () => {
    const response = await api.get('/calendar');
    return response.data;
  },
  createEvent: async (eventData) => {
    const response = await api.post('/calendar', eventData);
    return response.data;
  },
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/calendar/${id}`, eventData);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/calendar/${id}`);
    return response.data;
  }
};

// Skills Services
export const skillService = {
  getAllSkills: async () => {
    const response = await api.get('/skills/all');
    return response.data;
  },
  getUserSkills: async () => {
    const response = await api.get('/skills/user');
    return response.data;
  },
  addUserSkill: async (skillData) => {
    const response = await api.post('/skills/user', skillData);
    return response.data;
  },
  addSkillAssessment: async (skillId, assessmentData) => {
    const response = await api.post(`/skills/user/${skillId}/assessment`, assessmentData);
    return response.data;
  }
};

// Resume Services
export const resumeService = {
  getAllResumes: async () => {
    const response = await api.get('/resume');
    return response.data;
  },
  getResumeById: async (id) => {
    const response = await api.get(`/resume/${id}`);
    return response.data;
  },
  createResume: async (resumeData) => {
    const response = await api.post('/resume', resumeData);
    return response.data;
  },
  updateResume: async (id, resumeData) => {
    const response = await api.put(`/resume/${id}`, resumeData);
    return response.data;
  }
};

// ATS Services
export const atsService = {
  getParameters: async () => {
    const response = await api.get('/ats/parameters');
    return response.data;
  },
  createParameters: async (parameterData) => {
    const response = await api.post('/ats/parameters', parameterData);
    return response.data;
  },
  updateParameters: async (id, parameterData) => {
    const response = await api.put(`/ats/parameters/${id}`, parameterData);
    return response.data;
  },
  calculateScore: async (resumeId, parameterId) => {
    const response = await api.post('/ats/calculate-score', { resumeId, parameterId });
    return response.data;
  }
};

// Mentorship Services
export const mentorshipService = {
  getAllMentorships: async () => {
    const response = await api.get('/mentorship');
    return response.data;
  },
  getMyMentorships: async () => {
    const response = await api.get('/mentorship/my');
    return response.data;
  },
  createMentorshipRequest: async (mentorshipData) => {
    const response = await api.post('/mentorship/request', mentorshipData);
    return response.data;
  },
  updateMentorshipStatus: async (id, status) => {
    const response = await api.put(`/mentorship/${id}/status`, { status });
    return response.data;
  }
};

// Community Hub Services
export const communityService = {
  getPosts: async () => {
    const response = await api.get('/community/posts');
    return response.data;
  },
  createPost: async (postData) => {
    const response = await api.post('/community/posts', postData);
    return response.data;
  },
  getPostComments: async (postId) => {
    const response = await api.get(`/community/posts/${postId}/comments`);
    return response.data;
  },
  addComment: async (postId, commentData) => {
    const response = await api.post(`/community/posts/${postId}/comments`, commentData);
    return response.data;
  }
};

// Grievance Services
export const grievanceService = {
  getGrievances: async () => {
    const response = await api.get('/grievances');
    return response.data;
  },
  fileGrievance: async (grievanceData) => {
    const response = await api.post('/grievances', grievanceData);
    return response.data;
  },
  respondToGrievance: async (id, responseData) => {
    const response = await api.put(`/grievances/${id}/response`, responseData);
    return response.data;
  },
  closeGrievance: async (id) => {
    const response = await api.put(`/grievances/${id}/close`);
    return response.data;
  }
};

// Challenges Services
export const challengeService = {
  getChallenges: async () => {
    const response = await api.get('/challenges');
    return response.data;
  },
  createChallenge: async (challengeData) => {
    const response = await api.post('/challenges', challengeData);
    return response.data;
  },
  submitSolution: async (challengeId, solutionData) => {
    const response = await api.post(`/challenges/${challengeId}/solutions`, solutionData);
    return response.data;
  },
  evaluateSolution: async (challengeId, solutionId, evaluationData) => {
    const response = await api.put(`/challenges/${challengeId}/solutions/${solutionId}/evaluate`, evaluationData);
    return response.data;
  }
};

// Micro-Internship Services
export const microInternshipService = {
  getAllMicroInternships: async () => {
    const response = await api.get('/micro-internships');
    return response.data;
  },
  createMicroInternship: async (internshipData) => {
    const response = await api.post('/micro-internships', internshipData);
    return response.data;
  },
  applyToMicroInternship: async (internshipId) => {
    const response = await api.post(`/micro-internships/${internshipId}/apply`);
    return response.data;
  },
  updateMicroInternshipStatus: async (applicationId, status) => {
    const response = await api.put(`/micro-internships/applications/${applicationId}/status`, { status });
    return response.data;
  }
};

export default api;
