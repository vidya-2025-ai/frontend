import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Bell,
  Search,
  Upload,
  Shield,
  Globe,
  LinkIcon,
  Building,
  Users,
  Calendar as CalendarIcon,
  Video,
  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacySettings from '@/components/settings/PrivacySettings';
import SecuritySettings from '@/components/settings/SecuritySettings';

const Settings = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search settings..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Manage your account preferences and settings
                </p>
              </div>
              
              <Tabs defaultValue="profile" className="mt-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SettingsForm userType="recruiter" />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="organization">
                  <Card>
                    <CardHeader>
                      <CardTitle>Organization Details</CardTitle>
                      <CardDescription>Manage your organization information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg" alt="Organization logo" />
                            <AvatarFallback>ORG</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-2 items-center sm:items-start">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              Change Logo
                            </Button>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              JPG, GIF or PNG. 2MB max.
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="org-name">Organization Name</Label>
                            <Input id="org-name" defaultValue="TechRecruit Solutions" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="org-website">Website</Label>
                            <div className="flex">
                              <span className="flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                <Globe className="h-4 w-4" />
                              </span>
                              <Input 
                                id="org-website" 
                                className="rounded-l-none" 
                                defaultValue="https://techrecruit.com" 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <select 
                              id="industry" 
                              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option>Technology</option>
                              <option>Finance</option>
                              <option>Healthcare</option>
                              <option>Education</option>
                              <option>Manufacturing</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company-size">Company Size</Label>
                            <select 
                              id="company-size" 
                              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option>1-10 employees</option>
                              <option>11-50 employees</option>
                              <option>51-200 employees</option>
                              <option>201-1000 employees</option>
                              <option>1000+ employees</option>
                            </select>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="org-description">Company Description</Label>
                            <textarea 
                              id="org-description" 
                              rows={4} 
                              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              defaultValue="TechRecruit Solutions is a leading technology recruitment company connecting talented professionals with innovative organizations."
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage your team's access</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Team Members (3)</h3>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Invite Member
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {[
                            { name: "Sarah Rodriguez", email: "sarah@techrecruit.com", role: "Admin" },
                            { name: "James Wilson", email: "james@techrecruit.com", role: "Recruiter" },
                            { name: "Lisa Chen", email: "lisa@techrecruit.com", role: "Recruiter" }
                          ].map((member, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant={member.role === "Admin" ? "default" : "secondary"}>
                                  {member.role}
                                </Badge>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NotificationPreferences />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SecuritySettings />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy & Data</CardTitle>
                      <CardDescription>Control your data and privacy settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PrivacySettings />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Services</CardTitle>
                      <CardDescription>Manage third-party integrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {[
                            { 
                              name: "Applicant Tracking System",
                              icon: Building,
                              connected: true,
                              status: "Connected to ATS Pro"
                            },
                            { 
                              name: "Calendar Integration",
                              icon: CalendarIcon,
                              connected: true,
                              status: "Connected to Google Calendar"
                            },
                            { 
                              name: "Video Interview Platform",
                              icon: Video,
                              connected: false,
                              status: "Not connected"
                            },
                            { 
                              name: "Corporate Website",
                              icon: LinkIcon,
                              connected: false,
                              status: "Not connected"
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                  <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.status}</p>
                                </div>
                              </div>
                              <Button variant={item.connected ? "outline" : "default"}>
                                {item.connected ? "Configure" : "Connect"}
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Access</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage API keys for programmatic access
                          </p>
                          <div className="mt-4">
                            <Button variant="outline" className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Generate API Key
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
