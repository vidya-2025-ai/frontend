
import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail, Star, User, FileText, TrendingUp, RefreshCw } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';
import candidateService, { CandidateFilters, CandidateWithResume } from '@/services/api/candidateService';

const TalentSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CandidateFilters>({
    page: 1,
    limit: 12,
    sortBy: 'lastActive',
    sortOrder: 'desc'
  });

  // Memoized search function
  const searchCandidates = useCallback(() => {
    return candidateService.searchCandidates({
      ...filters,
      search: searchTerm || undefined
    });
  }, [filters, searchTerm]);

  // Fetch candidates with resumes and ATS scores
  const {
    data: candidates,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['talent-search', filters, searchTerm],
    queryFn: searchCandidates,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2
  });

  // Fetch candidate statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['candidate-statistics'],
    queryFn: () => candidateService.getCandidateStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes for stats
  });

  const handleSearch = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1,
    }));
  }, [searchTerm]);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value,
      page: 1,
    }));
  }, []);

  const handleContactCandidate = useCallback((candidateId: string) => {
    toast({
      title: "Contact Initiated",
      description: "Message functionality will be available soon.",
    });
  }, [toast]);

  const handleViewProfile = useCallback((candidateId: string) => {
    window.open(`/recruiter/candidates/${candidateId}`, '_blank');
  }, []);

  // Memoized utility functions
  const getInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }, []);

  const getATSScoreColor = useCallback((score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  }, []);

  const getATSScoreBadgeVariant = useCallback((score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  }, []);

  // Memoized statistics cards
  const statisticsCards = useMemo(() => {
    if (!stats || statsLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalCandidates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              {stats.bySkill.slice(0, 3).map((skill, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{skill.skill}</span>
                  <span className="text-gray-500">{skill.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Experience Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              {stats.byExperience.slice(0, 3).map((exp, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{exp.level}</span>
                  <span className="text-gray-500">{exp.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              {stats.byLocation.slice(0, 3).map((location, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{location.location}</span>
                  <span className="text-gray-500">{location.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }, [stats, statsLoading]);

  // Memoized candidates grid
  const candidatesGrid = useMemo(() => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-2 w-full mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading candidates. Please try again.</p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (!candidates || candidates.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No candidates found matching your criteria.</p>
            <Button onClick={() => {
              setSearchTerm('');
              setFilters({
                page: 1,
                limit: 12,
                sortBy: 'lastActive',
                sortOrder: 'desc'
              });
            }} variant="outline" className="mt-4">
              Clear Filters
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    {candidate.avatar ? (
                      <AvatarImage src={candidate.avatar} alt={candidate.firstName} />
                    ) : (
                      <AvatarFallback>
                        {getInitials(candidate.firstName, candidate.lastName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {candidate.education?.[0]?.field || 'Student'}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {candidate.availability || 'Available'}
                </Badge>
              </div>

              {/* ATS Score */}
              {candidate.resume && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">ATS Score</span>
                    <Badge variant={getATSScoreBadgeVariant(candidate.resume.atsScore)}>
                      {candidate.resume.atsScore}%
                    </Badge>
                  </div>
                  <Progress value={candidate.resume.atsScore} className="h-2" />
                </div>
              )}

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {(candidate.skills || []).slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {(candidate.skills || []).length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{(candidate.skills || []).length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{candidate.yearsOfExperience || 0} years experience</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Star className="h-4 w-4 mr-1" />
                  <span>Profile: {candidate.profileCompleteness || 0}% complete</span>
                </div>
              </div>

              {/* Resume Info */}
              {candidate.resume && (
                <div className="mb-4 p-2 bg-gray-50 rounded">
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="truncate">Resume: {candidate.resume.title}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleContactCandidate(candidate.id)}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleViewProfile(candidate.id)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }, [candidates, isLoading, error, refetch, getInitials, getATSScoreBadgeVariant, handleContactCandidate, handleViewProfile]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Talent Search</h1>
              <p className="mt-1 text-sm text-gray-600">
                Browse candidate profiles with resumes and ATS scores
              </p>
            </div>

            {/* Statistics Cards */}
            {statisticsCards}

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by name, skills, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={filters.availability || 'all'}
                      onValueChange={(value) => handleFilterChange('availability', value)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                        <SelectItem value="2 Weeks">2 Weeks</SelectItem>
                        <SelectItem value="Month">Month</SelectItem>
                        <SelectItem value="Negotiable">Negotiable</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filters.sortBy || 'lastActive'}
                      onValueChange={(value) => handleFilterChange('sortBy', value)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lastActive">Last Active</SelectItem>
                        <SelectItem value="firstName">Name</SelectItem>
                        <SelectItem value="yearsOfExperience">Experience</SelectItem>
                        <SelectItem value="profileCompleteness">Profile Score</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Candidates Grid */}
            {candidatesGrid}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentSearch;
