
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import skillAssessmentService from '@/services/api/skillAssessmentService';
import opportunityService from '@/services/api/opportunityService';
import { useToast } from '@/hooks/use-toast';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const AssessmentStats = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');
  
  const { data: assessmentStats, isLoading, isError } = useQuery({
    queryKey: ['assessmentStats', timeRange],
    queryFn: skillAssessmentService.getAssessmentStatistics,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load assessment statistics",
            variant: "destructive"
          });
        }
      }
    }
  });

  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ['recruiterOpportunities'],
    queryFn: () => opportunityService.getRecruiterOpportunities(),
  });

  const { data: candidateAssessments, isLoading: candidateAssessmentsLoading } = useQuery({
    queryKey: ['candidateAssessments', selectedOpportunity],
    queryFn: () => selectedOpportunity ? skillAssessmentService.getCandidateAssessmentsByOpportunity(selectedOpportunity) : Promise.resolve([]),
    enabled: !!selectedOpportunity,
  });

  // Format data for charts
  const topSkillsData = assessmentStats?.topSkills?.map(skill => ({
    name: skill.name,
    count: skill.userCount,
    score: Math.round(skill.averageScore * 20) // Convert to percentage (assuming level is 1-5)
  })) || [];

  const skillCategoryData = assessmentStats?.skillsByCategory?.map(category => ({
    name: category.category || 'Uncategorized',
    value: category.count
  })) || [];

  const assessmentScoreData = assessmentStats?.assessmentScores?.map(score => ({
    name: `${score.score}`,
    count: score.count
  })) || [];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Assessment Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track assessment activities of candidates who applied to your opportunities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 dark:text-gray-400">Loading assessment data...</p>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center flex-col h-64">
              <p className="text-red-500 mb-4">Failed to load assessment statistics</p>
              <Button variant="outline">Try Again</Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="candidates">Candidate Assessments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{assessmentStats?.totalCandidates || 0}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{assessmentStats?.totalAssessments || 0}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{topSkillsData.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Skill Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{skillCategoryData.length}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Skills Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Top Skills Among Your Candidates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topSkillsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="count" name="Number of Candidates" fill="#8884d8" />
                          <Bar yAxisId="right" dataKey="score" name="Average Score (%)" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Distribution Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Skill Categories Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={skillCategoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {skillCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} skills`, name]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Assessment Scores Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={assessmentScoreData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" label={{ value: 'Score Level', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Number of Candidates', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8">
                              {assessmentScoreData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="candidates" className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Select
                    value={selectedOpportunity}
                    onValueChange={setSelectedOpportunity}
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select an opportunity to view candidate assessments" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunities?.map((opportunity) => (
                        <SelectItem key={opportunity.id || opportunity._id} value={opportunity.id || opportunity._id || ''}>
                          {opportunity.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedOpportunity && candidateAssessments && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidateAssessments.map((assessment) => (
                      <Card key={assessment.candidate._id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {assessment.candidate.firstName} {assessment.candidate.lastName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Average Score:</span>
                              <span className="font-medium">{assessment.averageScore.toFixed(1)}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Total Assessments:</span>
                              <span className="font-medium">{assessment.totalAssessments}</span>
                            </div>
                            <div className="space-y-2">
                              <span className="text-sm text-gray-500">Top Skills:</span>
                              <div className="flex flex-wrap gap-1">
                                {assessment.skills.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                  >
                                    {skill.skill.name} ({skill.level}/5)
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentStats;
