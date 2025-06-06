
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useNotificationPreferences } from '@/hooks/useSettings';

const NotificationPreferences = () => {
  const { user } = useAuth();
  const { updateNotifications, isUpdating } = useNotificationPreferences();
  
  const [preferences, setPreferences] = useState({
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    applicationUpdates: user?.preferences?.applicationUpdates ?? true,
    newOpportunities: user?.preferences?.newOpportunities ?? true,
    marketingEmails: user?.preferences?.marketingEmails ?? false,
    realTimeAlerts: user?.preferences?.realTimeAlerts ?? true,
    messageNotifications: user?.preferences?.messageNotifications ?? true,
    systemUpdates: user?.preferences?.systemUpdates ?? true,
    challengeSubmissions: user?.preferences?.challengeSubmissions ?? true,
  });

  useEffect(() => {
    if (user?.preferences) {
      setPreferences({
        emailNotifications: user.preferences.emailNotifications ?? true,
        applicationUpdates: user.preferences.applicationUpdates ?? true,
        newOpportunities: user.preferences.newOpportunities ?? true,
        marketingEmails: user.preferences.marketingEmails ?? false,
        realTimeAlerts: user.preferences.realTimeAlerts ?? true,
        messageNotifications: user.preferences.messageNotifications ?? true,
        systemUpdates: user.preferences.systemUpdates ?? true,
        challengeSubmissions: user.preferences.challengeSubmissions ?? true,
      });
    }
  }, [user]);

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    updateNotifications(preferences);
  };

  const emailNotifications = [
    { 
      key: 'emailNotifications',
      title: "Email Notifications", 
      desc: "Receive emails about application updates" 
    },
    { 
      key: 'applicationUpdates',
      title: "Application Alerts", 
      desc: "Get notified when your application status changes" 
    },
    { 
      key: 'newOpportunities',
      title: "New Opportunities", 
      desc: "Be the first to know about new internships" 
    },
    { 
      key: 'marketingEmails',
      title: "Marketing Emails", 
      desc: "Receive promotional content and offers" 
    },
  ];

  const inAppNotifications = [
    { 
      key: 'realTimeAlerts',
      title: "Real-time Application Alerts", 
      desc: "Instant notifications for new applications" 
    },
    { 
      key: 'messageNotifications',
      title: "Message Notifications", 
      desc: user?.role === 'recruiter' ? "When you receive messages from candidates" : "When you receive messages from recruiters" 
    },
    { 
      key: 'systemUpdates',
      title: "System Updates", 
      desc: "Important updates about the platform" 
    },
    { 
      key: 'challengeSubmissions',
      title: user?.role === 'recruiter' ? "Challenge Submissions" : "Challenge Updates", 
      desc: user?.role === 'recruiter' ? "When candidates submit solutions to your challenges" : "Updates about coding challenges and assessments" 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
        <div className="mt-4 space-y-4">
          {emailNotifications.map((item) => (
            <div key={item.key} className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
              <Switch
                checked={preferences[item.key as keyof typeof preferences]}
                onCheckedChange={(checked) => handlePreferenceChange(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">In-App Notifications</h3>
        <div className="mt-4 space-y-4">
          {inAppNotifications.map((item) => (
            <div key={item.key} className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
              <Switch
                checked={preferences[item.key as keyof typeof preferences]}
                onCheckedChange={(checked) => handlePreferenceChange(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
