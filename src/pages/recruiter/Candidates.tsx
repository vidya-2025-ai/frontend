import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail, Star, Bell, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import candidateService, { CandidateFilters } from '@/services/api/candidateService';

const Candidates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<CandidateFilters>({
    role: 'student',
    page: 1,
    limit: 20,
  });

  // Selected filters state
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>('all');
  const [highScoreOnly, setHighScoreOnly] = useState(false);
  const [hasCertifications, setHasCertifications] = useState(false);
  const [mentorInterest, setMentorInterest] = useState(false);

  // Fetch candidates
  const {
    data: candidates,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['candidates', filters],
    queryFn: () => candidateService.searchCandidates(filters),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Candidates query error:', error);
          toast({
            title: "Error",
            description: "Could not load candidates. Please try again.",
            variant: "destructive"
          });
        } else {
          console.log('Candidates loaded successfully:', data?.length || 0);
        }
      }
    }
  });

  const handleSearch = () => {
    console.log('Search triggered with term:', searchTerm);
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1,
    }));
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      skills: selectedSkills,
      experienceLevel,
      availability: selectedStatus
    });
    
    const newFilters: CandidateFilters = {
      ...filters,
      skills: selectedSkills.length > 0 ? selectedSkills : undefined,
      experienceLevel: experienceLevel === 'all' ? undefined : experienceLevel,
      availability: selectedStatus.length > 0 ? selectedStatus[0] : undefined,
      page: 1,
    };
    
    setFilters(newFilters);
    toast({
      title: "Filters Applied",
      description: "Search results updated based on your criteria.",
    });
  }

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setSelectedStatus([]);
    setExperienceLevel('all');
    setHighScoreOnly(false);
    setHasCertifications(false);
    setMentorInterest(false);
    setSearchTerm('');
    
    setFilters({
      role: 'student',
      page: 1,
      limit: 20,
    });
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  }

  const handleExportCandidates = () => {
    toast({
      title: "Export Started",
      description: "Your candidates data is being prepared for download.",
    });
  }

  const handleViewProfile = (candidateId: string) => {
    window.open(`/recruiter/candidates/${candidateId}`, '_blank');
  }

  const handleContactCandidate = (candidateId: string) => {
    toast({
      title: "Contact Initiated",
      description: "You can now message this candidate.",
    });
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

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
                    placeholder="Search candidates by name, skills, or role..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Candidates</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Browse and manage candidate profiles ({candidates?.length || 0} found)
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCandidates}>
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Select 
                    defaultValue="lastActive" 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastActive">Last Active</SelectItem>
                      <SelectItem value="profileCompleteness">Profile Completeness</SelectItem>
                      <SelectItem value="yearsOfExperience">Experience</SelectItem>
                      <SelectItem value="firstName">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Availability</h3>
                        <div className="space-y-2">
                          {["Immediate", "2 Weeks", "Month", "Negotiable"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`status-${status}`} 
                                checked={selectedStatus.includes(status)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedStatus([...selectedStatus, status]);
                                  } else {
                                    setSelectedStatus(selectedStatus.filter(s => s !== status));
                                  }
                                }}
                              />
                              <Label htmlFor={`status-${status}`} className="text-sm">{status}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Skills</h3>
                        <div className="space-y-2">
                          {["React", "Python", "Product Management", "UX Design", "Data Science", "Marketing"].map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`skill-${skill}`} 
                                checked={selectedSkills.includes(skill)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedSkills([...selectedSkills, skill]);
                                  } else {
                                    setSelectedSkills(selectedSkills.filter(s => s !== skill));
                                  }
                                }}
                              />
                              <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Experience Level</h3>
                        <Select 
                          value={experienceLevel} 
                          onValueChange={setExperienceLevel}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All experience levels</SelectItem>
                            <SelectItem value="entry">Entry (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (6+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Additional Filters</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="mentor" 
                              checked={mentorInterest}
                              onCheckedChange={(checked) => setMentorInterest(!!checked)}
                            />
                            <Label htmlFor="mentor" className="text-sm">Interested in Mentoring</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="certifications" 
                              checked={hasCertifications}
                              onCheckedChange={(checked) => setHasCertifications(!!checked)}
                            />
                            <Label htmlFor="certifications" className="text-sm">Has Certifications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="highscore" 
                              checked={highScoreOnly}
                              onCheckedChange={(checked) => setHighScoreOnly(!!checked)}
                            />
                            <Label htmlFor="highscore" className="text-sm">Profile Completeness 90%+</Label>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                          <Button variant="outline" className="w-full" onClick={handleClearFilters}>Clear Filters</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500 dark:text-gray-400">Loading candidates...</p>
                </div>
              ) : isError ? (
                <div className="flex justify-center items-center h-64 flex-col">
                  <p className="text-red-500 mb-4">Error loading candidates. Please try again.</p>
                  <Button onClick={() => refetch()}>Retry</Button>
                </div>
              ) : candidates && candidates.length === 0 ? (
                <div className="flex justify-center items-center h-64 flex-col">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No candidates match your filters.</p>
                  <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {candidates?.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              {candidate.avatar ? (
                                <AvatarImage src={candidate.avatar} alt={candidate.firstName} />
                              ) : (
                                <AvatarFallback>{getInitials(`${candidate.firstName} ${candidate.lastName}`)}</AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {candidate.firstName} {candidate.lastName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.jobTitle || 'Student'}</p>
                            </div>
                          </div>
                          <Badge
                            variant="default"
                          >
                            {candidate.availability || 'Available'}
                          </Badge>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Experience: {candidate.yearsOfExperience || 0} years
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Education: {candidate.education && candidate.education.length > 0 
                                ? `${candidate.education[0].degree} in ${candidate.education[0].field}`
                                : 'Not specified'}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center mb-2">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completeness</p>
                              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                {candidate.profileCompleteness || 0}%
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {(candidate.skills || []).slice(0, 4).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
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
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => handleContactCandidate(candidate.id)}
                          >
                            <Mail className="h-4 w-4" />
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
