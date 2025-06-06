
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CircleHelp, PlayCircle, FileText, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading';
  isCompleted: boolean;
}

const CourseView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  
  // Get course info from location state or use default values
  const courseInfo = location.state?.course || {
    id: 1,
    name: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    progress: 30,
    modules: 12
  };
  
  // Mock modules for the course
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: 'Getting Started with HTML',
      description: 'Learn the basic structure of HTML documents and common elements',
      duration: '20 min',
      type: 'video',
      isCompleted: true
    },
    {
      id: 2,
      title: 'CSS Basics',
      description: 'Introduction to CSS styling and selectors',
      duration: '25 min',
      type: 'video',
      isCompleted: true
    },
    {
      id: 3,
      title: 'HTML & CSS Quiz',
      description: 'Test your knowledge on HTML and CSS basics',
      duration: '15 min',
      type: 'quiz',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Introduction to JavaScript',
      description: 'Learn the fundamentals of JavaScript programming',
      duration: '30 min',
      type: 'video',
      isCompleted: false
    },
    {
      id: 5,
      title: 'JavaScript Variables and Data Types',
      description: 'Understanding variables, constants, and data types in JavaScript',
      duration: '25 min',
      type: 'reading',
      isCompleted: false
    }
  ]);
  
  const handleCompleteModule = (moduleId: number) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, isCompleted: true } : module
    ));
    
    toast({
      title: "Module Completed",
      description: "Your progress has been updated",
    });
  };

  // Calculate the overall course progress based on completed modules
  const calculateProgress = () => {
    const completedCount = modules.filter(m => m.isCompleted).length;
    return Math.round((completedCount / modules.length) * 100);
  };
  
  // Get icon based on module type
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'quiz':
        return <CircleHelp className="h-5 w-5" />;
      case 'reading':
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{courseInfo.name}</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{courseInfo.description}</p>
              </div>
              <Button 
                variant="outline"
                className="mt-3 md:mt-0"
                onClick={() => navigate('/student/career-skills')}
              >
                Back to Courses
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardContent className="pt-6 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div className="flex items-center mb-2 md:mb-0">
                    <div className="mr-3">
                      <div className="relative">
                        <svg className="w-16 h-16">
                          <circle
                            className="text-gray-200 dark:text-gray-700"
                            strokeWidth="5"
                            stroke="currentColor"
                            fill="transparent"
                            r="30"
                            cx="32"
                            cy="32"
                          />
                          <circle
                            className="text-blue-600 dark:text-blue-400"
                            strokeWidth="5"
                            strokeDasharray={2 * Math.PI * 30}
                            strokeDashoffset={2 * Math.PI * 30 * (1 - calculateProgress() / 100)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="30"
                            cx="32"
                            cy="32"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                          {calculateProgress()}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your Progress</p>
                      <p className="font-medium">
                        {modules.filter(m => m.isCompleted).length} of {modules.length} modules completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{modules.length} Modules</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>Certificate Available</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id} className={`border ${module.isCompleted ? 'border-green-200 dark:border-green-900' : ''}`}>
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                          module.isCompleted 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {module.isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            getModuleIcon(module.type)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {index + 1}. {module.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {module.description}
                              </p>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge variant="outline" className="mr-3">{module.duration}</Badge>
                              <Button 
                                size="sm" 
                                disabled={module.isCompleted}
                                onClick={() => handleCompleteModule(module.id)}
                              >
                                {module.isCompleted ? 'Completed' : 'Start'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Supplementary Materials</CardTitle>
                    <CardDescription>
                      Additional resources to help you master the course content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-blue-600" />
                        <span>HTML Cheat Sheet.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-blue-600" />
                        <span>CSS Fundamentals Guide.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-blue-600" />
                        <span>JavaScript Basics.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>External Resources</CardTitle>
                    <CardDescription>
                      Helpful links to external learning materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">MDN Web Docs</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Comprehensive resource for web developers
                      </p>
                      <Button variant="link" className="p-0" onClick={() => window.open('https://developer.mozilla.org/', '_blank')}>
                        Visit Website
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">W3Schools</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Tutorials and references for web development
                      </p>
                      <Button variant="link" className="p-0" onClick={() => window.open('https://www.w3schools.com/', '_blank')}>
                        Visit Website
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

export default CourseView;
