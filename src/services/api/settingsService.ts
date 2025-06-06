
import api from './index';

export const settingsService = {
  // Update notification preferences
  updateNotificationPreferences: async (preferences: {
    emailNotifications?: boolean;
    applicationUpdates?: boolean;
    marketingEmails?: boolean;
    newOpportunities?: boolean;
    realTimeAlerts?: boolean;
    messageNotifications?: boolean;
    systemUpdates?: boolean;
    challengeSubmissions?: boolean;
  }) => {
    const response = await api.put('/users/notifications', preferences);
    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/users/password', data);
    return response.data;
  },

  // Reset account data
  resetAccountData: async () => {
    const response = await api.delete('/users/reset-data');
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response.data;
  },

  // Get user sessions
  getUserSessions: async () => {
    const response = await api.get('/users/sessions');
    return response.data;
  },

  // Sign out from session
  signOutSession: async (sessionId: number) => {
    const response = await api.delete(`/users/sessions/${sessionId}`);
    return response.data;
  }
};

export default settingsService;
