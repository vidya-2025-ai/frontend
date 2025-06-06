
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { skillService } from '@/services/api/skillService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
  }[];
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Which of the following is a JavaScript framework?",
    options: [
      { id: 1, text: "Python" },
      { id: 2, text: "React" },
      { id: 3, text: "SQL" },
      { id: 4, text: "HTML" }
    ]
  },
  {
    id: 2,
    text: "What does CSS stand for?",
    options: [
      { id: 1, text: "Colorful Style Sheets" },
      { id: 2, text: "Computer Style Sheets" },
      { id: 3, text: "Cascading Style Sheets" },
      { id: 4, text: "Creative Style Sheets" }
    ]
  },
  {
    id: 3,
    text: "Which of the following is used for version control?",
    options: [
      { id: 1, text: "Docker" },
      { id: 2, text: "Jenkins" },
      { id: 3, text: "Git" },
      { id: 4, text: "Kubernetes" }
    ]
  },
  {
    id: 4,
    text: "Which data structure follows the LIFO principle?",
    options: [
      { id: 1, text: "Queue" },
      { id: 2, text: "Stack" },
      { id: 3, text: "Linked List" },
      { id: 4, text: "Tree" }
    ]
  },
  {
    id: 5,
    text: "Which protocol is used to transfer hypertext documents?",
    options: [
      { id: 1, text: "FTP" },
      { id: 2, text: "SMTP" },
      { id: 3, text: "HTTP" },
      { id: 4, text: "SSH" }
    ]
  }
];

const SkillAssessmentTake = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // We'll use this query to get skill info
  const { data: skills } = useQuery({
    queryKey: ['allSkills'],
    queryFn: skillService.getAllSkills
  });

  const handleAnswer = (optionId: number) => {
    setAnswers({
      ...answers,
      [mockQuestions[currentQuestion].id]: optionId
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeAssessment = async () => {
    try {
      // Here we would normally send the answers to the backend
      // For now we'll just show a success message
      
      // Mock correct answers for demo purposes
      const correctAnswers = {1: 2, 2: 3, 3: 3, 4: 2, 5: 3};
      let score = 0;
      
      Object.keys(answers).forEach(qId => {
        const questionId = parseInt(qId);
        if (answers[questionId] === correctAnswers[questionId as keyof typeof correctAnswers]) {
          score++;
        }
      });
      
      const skillLevel = Math.round((score / mockQuestions.length) * 5);
      
      // In a real app, we would save this result to the backend
      toast({
        title: "Assessment Completed",
        description: `You scored ${score}/${mockQuestions.length}!`,
      });
      
      setIsCompleted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your assessment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skill Assessment</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Test your knowledge and validate your skills
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/student/career-skills')}
              >
                Back to Skills
              </Button>
            </div>
            
            {isCompleted ? (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Assessment Completed!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="mx-auto w-32 h-32 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 text-green-600 dark:text-green-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Great Job!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You've completed the assessment. Your profile has been updated with your new skill level.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={() => navigate('/student/career-skills')}>
                        View Your Skills
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers({});
                        setIsCompleted(false);
                      }}>
                        Take Another Assessment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Question {currentQuestion + 1} of {mockQuestions.length}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-4">
                    <Progress value={(currentQuestion / mockQuestions.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="text-lg font-medium mb-4">
                    {mockQuestions[currentQuestion].text}
                  </div>
                  
                  <RadioGroup
                    value={answers[mockQuestions[currentQuestion].id]?.toString()}
                    onValueChange={(value) => handleAnswer(parseInt(value))}
                    className="space-y-3"
                  >
                    {mockQuestions[currentQuestion].options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                        <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!answers[mockQuestions[currentQuestion].id]}
                    >
                      {currentQuestion < mockQuestions.length - 1 ? 'Next' : 'Complete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentTake;
