
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacySettings from '@/components/settings/PrivacySettings';
import SecuritySettings from '@/components/settings/SecuritySettings';

const Settings = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Manage your account preferences and settings
                </p>
              </div>
              <ThemeToggle size="default" />
            </div>
            <Separator className="my-6" />
            
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your profile information and account preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SettingsForm userType="student" />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Theme</h3>
                        <p className="text-sm text-gray-500">
                          Choose between light and dark theme
                        </p>
                      </div>
                      <ThemeToggle />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Text Size</h3>
                        <p className="text-sm text-gray-500">
                          Adjust the text size for better readability
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Small</Button>
                        <Button variant="outline" size="sm">Medium</Button>
                        <Button variant="outline" size="sm">Large</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NotificationPreferences />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and sessions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SecuritySettings />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                    <CardDescription>
                      Control your data and privacy settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PrivacySettings />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
