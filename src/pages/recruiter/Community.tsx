
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bell, 
  Search, 
  MessageSquare, 
  Heart, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Upload 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const discussions = [
    {
      id: 1,
      title: "Tips for conducting effective technical interviews",
      author: {
        name: "Sarah Rodriguez",
        role: "Recruiter"
      },
      date: "2025-04-25",
      category: "Best Practices",
      comments: 12,
      likes: 28
    },
    {
      id: 2,
      title: "Implementing skill-based matching in recruitment",
      author: {
        name: "James Wilson",
        role: "Recruiter"
      },
      date: "2025-04-23",
      category: "Skill Assessment",
      comments: 8,
      likes: 15
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Virtual Career Fair",
      date: "May 10, 2025",
      time: "10:00 AM - 4:00 PM",
      participants: 120,
      description: "Connect with potential candidates from top universities across the country."
    },
    {
      id: 2,
      title: "Resume Review Workshop",
      date: "May 15, 2025",
      time: "2:00 PM - 4:00 PM",
      participants: 45,
      description: "Help students improve their resumes through personalized feedback."
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Internship Program Guide",
      description: "Comprehensive guide for setting up and managing internship programs",
      type: "PDF Guide",
      downloads: 87
    },
    {
      id: 2,
      title: "Interview Question Bank",
      description: "Collection of skill-based interview questions across different roles",
      type: "Template",
      downloads: 124
    },
    {
      id: 3,
      title: "Mentorship Best Practices",
      description: "Guidelines for effective mentorship relationships",
      type: "Presentation",
      downloads: 56
    }
  ];

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
                    placeholder="Search community..."
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
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Community Hub</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Connect with other recruiters and share knowledge
                  </p>
                </div>
              </div>

              <Tabs defaultValue="discussions" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="discussions">
                  <div className="flex justify-between mb-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">All Categories</Button>
                      <Button variant="outline" size="sm">Best Practices</Button>
                      <Button variant="outline" size="sm">Skill Assessment</Button>
                      <Button variant="outline" size="sm">Mentorship</Button>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Discussion
                    </Button>
                  </div>
                
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{discussion.title}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{discussion.author.name}</span>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(discussion.date).toLocaleDateString()}</span>
                                <Badge variant="outline">{discussion.category}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{discussion.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{discussion.likes}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button>View Discussion</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Start a New Discussion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Title
                            </label>
                            <Input id="title" placeholder="Enter discussion title" />
                          </div>
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Category
                            </label>
                            <select 
                              id="category" 
                              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option>Best Practices</option>
                              <option>Skill Assessment</option>
                              <option>Mentorship</option>
                              <option>Challenges</option>
                              <option>General Discussion</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Content
                            </label>
                            <textarea 
                              id="content" 
                              rows={4}
                              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Share your thoughts, questions, or insights..."
                            ></textarea>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Post Discussion</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="events">
                  <div className="flex justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Community Events</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect with candidates through virtual and in-person events
                      </p>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Event
                    </Button>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div>
                            <Badge className="mb-2">Upcoming</Badge>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.title}</h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{event.participants} registered participants</span>
                              </div>
                            </div>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">{event.description}</p>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline">Edit Event</Button>
                            <Button>Manage Participants</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Event Title
                          </label>
                          <Input id="event-title" placeholder="Enter event title" />
                        </div>
                        <div>
                          <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Event Type
                          </label>
                          <select 
                            id="event-type" 
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option>Career Fair</option>
                            <option>Workshop</option>
                            <option>Webinar</option>
                            <option>Hackathon</option>
                            <option>Networking</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date
                          </label>
                          <Input id="event-date" type="date" />
                        </div>
                        <div>
                          <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Time
                          </label>
                          <Input id="event-time" type="time" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea 
                            id="event-description" 
                            rows={4}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Describe the event..."
                          ></textarea>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>Create Event</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="resources">
                  <div className="flex justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recruiter Resources</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Access and share helpful resources for recruiters
                      </p>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Upload Resource
                    </Button>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between mb-3">
                            <Badge variant="outline">{resource.type}</Badge>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{resource.downloads} downloads</span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                          <div className="mt-4 flex justify-end">
                            <Button>Download</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload New Resource</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="resource-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Resource Title
                          </label>
                          <Input id="resource-title" placeholder="Enter resource title" />
                        </div>
                        <div>
                          <label htmlFor="resource-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Resource Type
                          </label>
                          <select 
                            id="resource-type" 
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option>PDF Guide</option>
                            <option>Template</option>
                            <option>Presentation</option>
                            <option>Video</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="resource-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea 
                            id="resource-description" 
                            rows={3}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Describe the resource..."
                          ></textarea>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Drag and drop files here, or click to browse
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            PDF, PPTX, DOCX, MP4 (Max 50MB)
                          </p>
                          <Input id="file-upload" type="file" className="hidden" />
                          <Button variant="outline" size="sm" className="mt-2">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>Upload Resource</Button>
                    </CardFooter>
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

export default Community;
