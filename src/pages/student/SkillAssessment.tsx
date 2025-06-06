
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Book, Award, GraduationCap, CheckCircle, BookOpen, ListCheck } from 'lucide-react';

const skillAssessments = [
  {
    id: 1,
    name: "Frontend Development",
    description: "HTML, CSS, JavaScript, React fundamentals",
    estimated: "45 minutes",
    completed: false,
    recommended: true,
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Node.js, Express, databases, API design",
    estimated: "60 minutes",
    completed: false,
    recommended: true,
    skills: ["Node.js", "Express", "MongoDB", "RESTful APIs"]
  },
  {
    id: 3,
    name: "UX Design Principles",
    description: "User research, wireframing, prototyping",
    estimated: "40 minutes",
    completed: true,
    score: 87,
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
  },
  {
    id: 4,
    name: "Data Analysis",
    description: "Statistical analysis, data visualization",
    estimated: "55 minutes",
    completed: true,
    score: 92,
    skills: ["Excel", "SQL", "Python", "Data Visualization"]
  }
];

const coursesData = [
  {
    id: 1,
    title: "React JS: Complete Developer Course",
    provider: "InternMatch Academy",
    level: "Intermediate",
    duration: "4 weeks",
    enrolled: true,
    progress: 65,
    image: "/placeholder.svg",
    skills: ["React", "Redux", "JavaScript", "Web Development"]
  },
  {
    id: 2,
    title: "Full Stack Web Development Bootcamp",
    provider: "Web Dev Mastery",
    level: "Advanced",
    duration: "8 weeks",
    enrolled: true,
    progress: 32,
    image: "/placeholder.svg",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    provider: "Design Academy",
    level: "Beginner",
    duration: "3 weeks",
    enrolled: false,
    image: "/placeholder.svg",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"]
  },
  {
    id: 4,
    title: "Data Science for Business",
    provider: "Analytics Institute",
    level: "Intermediate",
    duration: "6 weeks",
    enrolled: false,
    image: "/placeholder.svg",
    skills: ["Python", "Data Analysis", "Machine Learning", "Visualization"]
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    provider: "Cloud Experts",
    level: "Advanced",
    duration: "5 weeks",
    enrolled: false,
    image: "/placeholder.svg",
    skills: ["AWS", "Cloud Architecture", "DevOps", "Serverless"]
  },
];

const projectBasedLearningData = [
  {
    id: 1,
    title: "Build a Real-time Chat Application",
    description: "Create a full-stack chat application using React and Firebase",
    difficulty: "Intermediate",
    duration: "2 weeks",
    enrolled: true,
    progress: 75,
    skills: ["React", "Firebase", "WebSockets", "Authentication"]
  },
  {
    id: 2,
    title: "E-commerce Platform Development",
    description: "Develop a complete e-commerce solution with payment processing",
    difficulty: "Advanced",
    duration: "4 weeks",
    enrolled: false,
    skills: ["React", "Node.js", "MongoDB", "Stripe", "Authentication"]
  },
  {
    id: 3,
    title: "Portfolio Website with CI/CD",
    description: "Create your personal portfolio with automated deployment pipeline",
    difficulty: "Beginner",
    duration: "1 week",
    enrolled: true,
    progress: 30,
    skills: ["HTML", "CSS", "JavaScript", "GitHub Actions", "Netlify"]
  }
];

// Learning paths
const learningPaths = [
  {
    id: 1,
    title: "Frontend Developer Path",
    description: "Master modern frontend technologies and frameworks",
    duration: "3 months",
    courses: 5,
    projects: 3,
    assessments: 2,
    enrolled: true,
    progress: 45,
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"]
  },
  {
    id: 2,
    title: "Data Science Specialist",
    description: "Learn data analysis, visualization, and machine learning",
    duration: "4 months",
    courses: 6,
    projects: 4,
    assessments: 3,
    enrolled: false,
    skills: ["Python", "SQL", "Data Analysis", "Machine Learning", "Statistics"]
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    description: "Become proficient in both frontend and backend development",
    duration: "6 months",
    courses: 8,
    projects: 5,
    assessments: 4,
    enrolled: false,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS", "TypeScript"]
  },
];

const SkillAssessment = () => {
  const [activeTab, setActiveTab] = useState("assessments");

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills & Learning</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Assess your skills and enhance your knowledge through courses and projects
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>View All Skills</Button>
              </div>
            </div>

            <Tabs defaultValue="assessments" value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-lg mx-auto">
                <TabsTrigger value="assessments" className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Assessments
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center">
                  <ListCheck className="mr-2 h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="paths" className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Learning Paths
                </TabsTrigger>
              </TabsList>

              {/* Assessment Tab Content */}
              <TabsContent value="assessments" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="mr-2 h-5 w-5 text-yellow-500" />
                        Internship Guarantee Program
                      </CardTitle>
                      <CardDescription>Complete skill assessments with 80%+ scores to qualify</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">2/5 completed</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <p className="text-sm font-medium">Your Current Status</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete 3 more assessments to qualify for guaranteed internship placement</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Get Certified Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Skill Profile</CardTitle>
                      <CardDescription>Based on completed assessments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          {skillAssessments
                            .filter(assessment => assessment.completed)
                            .flatMap(assessment => assessment.skills)
                            .map((skill, index) => (
                              <Badge key={index} className="justify-center py-1.5">{skill}</Badge>
                            ))
                          }
                        </div>
                        {skillAssessments.filter(assessment => assessment.completed).length === 0 && (
                          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Complete assessments to build your skill profile</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Assessments</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {skillAssessments.map((assessment) => (
                    <Card key={assessment.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assessment.name}</CardTitle>
                          {assessment.recommended && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{assessment.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Estimated time: {assessment.estimated}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {assessment.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                          {assessment.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{assessment.skills.length - 3}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {assessment.completed ? (
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Your score</span>
                              <span className="text-sm font-medium">{assessment.score}%</span>
                            </div>
                            <Progress value={assessment.score} className="h-2 mb-2" />
                            <Button variant="outline" className="w-full mt-1">View Certificate</Button>
                          </div>
                        ) : (
                          <Button className="w-full">Start Assessment</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Courses Tab Content */}
              <TabsContent value="courses" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-purple-500" />
                        Learning Dashboard
                      </CardTitle>
                      <CardDescription>Track your learning progress across courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">2</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Courses In Progress</p>
                          </div>
                          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">48%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Average Progress</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full bg-white/80 dark:bg-gray-800/80">
                          View Your Learning Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Course Categories</CardTitle>
                      <CardDescription>Based on your profile and assessments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 mr-2"></span>
                            <span className="text-sm font-medium">Web Development</span>
                          </div>
                          <Badge>12 courses</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></span>
                            <span className="text-sm font-medium">Data Science</span>
                          </div>
                          <Badge>8 courses</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-purple-600 mr-2"></span>
                            <span className="text-sm font-medium">UI/UX Design</span>
                          </div>
                          <Badge>5 courses</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-600 mr-2"></span>
                            <span className="text-sm font-medium">Cloud Computing</span>
                          </div>
                          <Badge>7 courses</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Courses</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {coursesData.map((course) => (
                    <Card key={course.id} className="flex flex-col overflow-hidden">
                      <div className="h-36 bg-gray-200 dark:bg-gray-700 relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={
                            course.level === "Beginner" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                            course.level === "Intermediate" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }>
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                        <CardDescription>{course.provider} • {course.duration}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {course.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                          {course.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{course.skills.length - 2}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {course.enrolled ? (
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2 mb-3" />
                            <Button className="w-full">Continue Learning</Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full">Enroll Now</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Projects Tab Content */}
              <TabsContent value="projects" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ListCheck className="mr-2 h-5 w-5 text-green-500" />
                        Project-Based Learning
                      </CardTitle>
                      <CardDescription>Learn by building real-world projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4">
                          <p className="text-sm font-medium mb-2">Why Project-Based Learning?</p>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-4">
                            <li>Apply theoretical knowledge to practical scenarios</li>
                            <li>Build portfolio-worthy projects to show employers</li>
                            <li>Learn collaboration and project management skills</li>
                            <li>Get feedback from industry mentors</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Find More Projects</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Active Projects</CardTitle>
                      <CardDescription>Projects you're currently working on</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {projectBasedLearningData
                          .filter(project => project.enrolled)
                          .map(project => (
                            <div key={project.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{project.title}</h4>
                                <Badge variant="outline">{project.difficulty}</Badge>
                              </div>
                              <div className="flex justify-between items-center mt-3 mb-1 text-xs">
                                <span>Progress: {project.progress}%</span>
                                <span>{project.duration}</span>
                              </div>
                              <Progress value={project.progress} className="h-1.5" />
                            </div>
                          ))
                        }
                        {projectBasedLearningData.filter(project => project.enrolled).length === 0 && (
                          <p className="text-center text-gray-500 dark:text-gray-400 py-4">You haven't enrolled in any projects yet</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Projects</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projectBasedLearningData.map((project) => (
                    <Card key={project.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant={
                            project.difficulty === "Beginner" ? "secondary" : 
                            project.difficulty === "Intermediate" ? "default" : 
                            "destructive"
                          } className="ml-2">
                            {project.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center text-sm mb-3">
                          <span className="text-gray-500 dark:text-gray-400">Duration: {project.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                          {project.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{project.skills.length - 3}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {project.enrolled ? (
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2 mb-2" />
                            <Button className="w-full mt-1">Continue Project</Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full">Start Project</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Learning Paths Tab Content */}
              <TabsContent value="paths" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-amber-500" />
                        Learning Paths
                      </CardTitle>
                      <CardDescription>Structured learning journeys to reach your career goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4">
                          <p className="text-sm font-medium mb-1">What are Learning Paths?</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Learning paths combine courses, projects, and assessments into a structured program designed to help you master a specific career direction.
                          </p>
                        </div>
                        <div className="flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg p-3">
                          <div className="flex items-center space-x-1">
                            <Book className="w-4 h-4 text-blue-500" />
                            <span className="text-xs">Courses</span>
                          </div>
                          <span className="mx-2 text-gray-400">+</span>
                          <div className="flex items-center space-x-1">
                            <ListCheck className="w-4 h-4 text-green-500" />
                            <span className="text-xs">Projects</span>
                          </div>
                          <span className="mx-2 text-gray-400">+</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span className="text-xs">Assessments</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Explore Career Paths</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Learning Path</CardTitle>
                      <CardDescription>Current progress in your selected path</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {learningPaths.find(path => path.enrolled) ? (
                        <div className="space-y-4">
                          {learningPaths
                            .filter(path => path.enrolled)
                            .map(path => (
                              <div key={path.id} className="space-y-3">
                                <h4 className="font-medium">{path.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{path.description}</p>
                                
                                <div className="flex justify-between items-center mt-2 mb-1 text-sm">
                                  <span className="font-medium">Overall Progress</span>
                                  <span>{path.progress}%</span>
                                </div>
                                <Progress value={path.progress} className="h-2 mb-3" />

                                <div className="grid grid-cols-3 gap-2 text-center">
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                                    <span className="block text-lg font-bold text-blue-600 dark:text-blue-400">{path.courses}</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Courses</span>
                                  </div>
                                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                                    <span className="block text-lg font-bold text-green-600 dark:text-green-400">{path.projects}</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Projects</span>
                                  </div>
                                  <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                                    <span className="block text-lg font-bold text-amber-600 dark:text-amber-400">{path.assessments}</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Assessments</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-500 dark:text-gray-400">You haven't enrolled in any learning paths yet</p>
                          <Button className="mt-4">Choose a Learning Path</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Learning Paths</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {learningPaths.map((path) => (
                    <Card key={path.id} className={`flex flex-col ${path.enrolled ? 'border-blue-300 dark:border-blue-700' : ''}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{path.title}</CardTitle>
                          {path.enrolled && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Enrolled
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{path.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-gray-500 dark:text-gray-400">Duration: {path.duration}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {path.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                          {path.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{path.skills.length - 3}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            <span className="font-medium block">{path.courses}</span>
                            <span className="text-gray-500">Courses</span>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            <span className="font-medium block">{path.projects}</span>
                            <span className="text-gray-500">Projects</span>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            <span className="font-medium block">{path.assessments}</span>
                            <span className="text-gray-500">Assessments</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {path.enrolled ? (
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-medium">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2 mb-2" />
                            <Button className="w-full mt-1">Continue Learning</Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full">Enroll Now</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
