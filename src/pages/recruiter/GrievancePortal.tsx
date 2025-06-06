
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Grievances = () => {
  const openGrievances = [
    {
      id: 1,
      subject: "Interview Process Concerns",
      candidate: "Alex Johnson",
      position: "Software Engineer",
      date: "2025-04-22",
      status: "Open",
      priority: "High",
      description: "I experienced inconsistent questions from different interviewers for the same position."
    },
    {
      id: 2,
      subject: "Project Assignment Clarification",
      candidate: "Sarah Williams",
      position: "Product Manager",
      date: "2025-04-21",
      status: "In Progress",
      priority: "Medium",
      description: "The scope of the assigned project wasn't clearly defined and exceeded what was initially communicated."
    }
  ];

  const resolvedGrievances = [
    {
      id: 3,
      subject: "Delayed Feedback After Interview",
      candidate: "Michael Brown",
      position: "UI/UX Designer",
      date: "2025-04-15",
      resolvedDate: "2025-04-18",
      status: "Resolved",
      resolution: "Provided detailed feedback and improved communication timeline"
    },
    {
      id: 4,
      subject: "Mentorship Program Access",
      candidate: "Emily Chen",
      position: "Data Science Intern",
      date: "2025-04-10",
      resolvedDate: "2025-04-14",
      status: "Resolved",
      resolution: "Assigned a dedicated mentor and scheduled regular sessions"
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
                    placeholder="Search grievances..."
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Grievance Portal</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage and address intern grievances and concerns
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Grievances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">4</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2 active, 2 resolved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Average Resolution Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">3.5 days</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">From submission to resolution</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Satisfaction Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">92%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Based on post-resolution feedback</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="open" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="open">Open Grievances</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="open">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {openGrievances.map((grievance) => (
                            <TableRow key={grievance.id}>
                              <TableCell className="font-medium">{grievance.subject}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{grievance.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <span>{grievance.candidate}</span>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(grievance.date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={grievance.status === "Open" ? "default" : "secondary"}
                                >
                                  {grievance.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    grievance.priority === "High" 
                                      ? "destructive" 
                                      : grievance.priority === "Medium"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {grievance.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button size="sm">Respond</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6 space-y-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Grievance Details</h2>
                    <Card>
                      <CardHeader>
                        <CardTitle>{openGrievances[0].subject}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidate</p>
                              <p className="text-gray-900 dark:text-white">{openGrievances[0].candidate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</p>
                              <p className="text-gray-900 dark:text-white">{openGrievances[0].position}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted</p>
                              <p className="text-gray-900 dark:text-white">{new Date(openGrievances[0].date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</p>
                            <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                              <p className="text-gray-900 dark:text-white">{openGrievances[0].description}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Response</p>
                            <div className="mt-2">
                              <textarea 
                                rows={4}
                                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter your response to this grievance..."
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline">Assign to Team Member</Button>
                              <Button variant="outline">Schedule Meeting</Button>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">Mark as In Progress</Button>
                              <Button>Resolve Grievance</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="resolved">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Resolved</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resolvedGrievances.map((grievance) => (
                            <TableRow key={grievance.id}>
                              <TableCell className="font-medium">{grievance.subject}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{grievance.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <span>{grievance.candidate}</span>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(grievance.date).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(grievance.resolvedDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {grievance.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">View Details</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grievance Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Grievance Categories",
                            description: "Breakdown of grievances by category",
                            type: "Chart"
                          },
                          {
                            title: "Resolution Time Trends",
                            description: "Average resolution time over the past 6 months",
                            type: "Graph"
                          },
                          {
                            title: "Candidate Satisfaction",
                            description: "Analysis of post-resolution feedback",
                            type: "Report"
                          },
                          {
                            title: "Common Issues",
                            description: "Recurring themes in grievances and recommended actions",
                            type: "Summary"
                          }
                        ].map((report, idx) => (
                          <div key={idx} className="p-4 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="font-medium text-gray-900 dark:text-white">{report.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{report.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="outline">{report.type}</Badge>
                              <Button variant="outline" size="sm">View Report</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-4">
                        <Button>Generate Custom Report</Button>
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

export default Grievances;
