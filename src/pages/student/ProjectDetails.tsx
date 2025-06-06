
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Code, FileText, MessageSquare, User } from 'lucide-react';

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');
  
  // Get project info from location state or use default values
  const project = location.state?.project || {
    id: 1,
    name: 'Build a Responsive E-commerce Website',
    tags: ['Frontend', 'React', 'Tailwind CSS'],
    deadline: '2023-12-15',
    description: 'Create a fully responsive e-commerce website with product listings, cart functionality, and checkout process.',
    objectives: [
      'Implement responsive design that works on mobile, tablet, and desktop',
      'Create product listing pages with filtering and sorting options',
      'Implement shopping cart with add/remove functionality',
      'Create a multi-step checkout process',
      'Implement user authentication'
    ],
    requirements: [
      'React.js',
      'State management (Redux or Context API)',
      'CSS framework (Tailwind, Bootstrap, etc.)',
      'Version control with Git'
    ],
    team: [
      { id: 1, name: 'Alex Johnson', role: 'Project Lead', avatar: '' },
      { id: 2, name: 'Jamie Smith', role: 'UX Designer', avatar: '' },
      { id: 3, name: 'Taylor Brown', role: 'Frontend Developer', avatar: '' }
    ],
    files: [
      { id: 1, name: 'Project Brief.pdf', type: 'pdf', size: '1.2 MB' },
      { id: 2, name: 'Wireframes.png', type: 'image', size: '3.5 MB' },
      { id: 3, name: 'Technical Requirements.docx', type: 'document', size: '890 KB' }
    ],
    discussions: [
      {
        id: 1,
        user: { name: 'Alex Johnson', avatar: '' },
        content: 'Welcome to the project! Let\'s start by discussing the overall design approach.',
        timestamp: '2023-11-10T10:30:00Z'
      },
      {
        id: 2,
        user: { name: 'Jamie Smith', avatar: '' },
        content: 'I\'ve uploaded the wireframes for the product listing page. Please take a look and provide feedback.',
        timestamp: '2023-11-11T14:15:00Z'
      }
    ]
  };
  
  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, we would save this to the backend
    // For now, just show a toast
    toast({
      title: "Comment Added",
      description: "Your comment was successfully added to the discussion.",
    });
    
    setComment('');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.name}</h1>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <Badge variant="outline" className="flex items-center gap-1 mr-3">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {formatDate(project.deadline)}</span>
                </Badge>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/student/career-skills')}
                >
                  Back to Projects
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="details" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" /> Details
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Team
                </TabsTrigger>
                <TabsTrigger value="files" className="flex items-center gap-1">
                  <Code className="h-4 w-4" /> Files
                </TabsTrigger>
                <TabsTrigger value="discussions" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> Discussions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                  </CardContent>
                </Card>
                
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Objectives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {project.objectives.map((objective: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{objective}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {project.requirements.map((requirement: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{requirement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button>Join Project</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Project participants and their roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.team.map((member: any) => (
                        <div key={member.id} className="flex items-center p-4 border rounded-lg">
                          <Avatar className="h-10 w-10 mr-4">
                            {member.avatar ? (
                              <AvatarImage src={member.avatar} alt={member.name} />
                            ) : (
                              <AvatarFallback>
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="files" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Files</CardTitle>
                    <CardDescription>
                      Documentation, designs, and other project resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.files.map((file: any) => (
                      <div key={file.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{file.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discussions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Discussions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      {project.discussions.map((discussion: any) => (
                        <div key={discussion.id} className="p-4 border rounded-lg">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-8 w-8 mr-3">
                              {discussion.user.avatar ? (
                                <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                              ) : (
                                <AvatarFallback>
                                  {discussion.user.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{discussion.user.name}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatTimestamp(discussion.timestamp)}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{discussion.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-3">Add Comment</h3>
                      <Textarea
                        placeholder="Type your comment here..."
                        className="mb-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!comment.trim()}
                      >
                        Post Comment
                      </Button>
                    </div>
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

export default ProjectDetails;
