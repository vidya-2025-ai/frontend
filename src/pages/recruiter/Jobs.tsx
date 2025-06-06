
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Users, 
  Star,
  Bell,
  FilePlus 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { opportunityService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const data = await opportunityService.getRecruiterOpportunities();
        setOpportunities(data);
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
        toast({
          title: "Error",
          description: "Failed to load your job postings. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunities();
  }, [toast]);
  
  const handlePostNewJob = () => {
    navigate('/recruiter/post-internship');
  };
  
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await opportunityService.updateOpportunity(id, {
        isActive: !currentStatus
      });
      
      // Update local state
      setOpportunities(opportunities.map(job => 
        job._id === id ? {...job, isActive: !currentStatus} : job
      ));
      
      toast({
        title: "Status Updated",
        description: `Job has been ${!currentStatus ? 'activated' : 'deactivated'}.`
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      toast({
        title: "Error",
        description: "Failed to update job status. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Filter opportunities based on search term
  const filteredOpportunities = opportunities.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    placeholder="Search jobs..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    <AvatarFallback>
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName[0]}${user.lastName[0]}` 
                        : 'RC'}
                    </AvatarFallback>
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Posted Jobs</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage your job postings and track applications
                  </p>
                </div>
                <Button className="flex items-center gap-2" onClick={handlePostNewJob}>
                  <FilePlus className="h-4 w-4" />
                  Post New Job
                </Button>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="applications">Most Applications</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Job Type</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            <SelectItem value="fulltime">Full-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="challenge">Challenge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Location</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All locations</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">On-site</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Status</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-4">
                          <Button className="w-full">Apply Filters</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {loading ? (
                <div className="flex justify-center py-10">
                  <p>Loading jobs...</p>
                </div>
              ) : filteredOpportunities.length > 0 ? (
                <div className="space-y-4">
                  {filteredOpportunities.map((job) => (
                    <Card key={job._id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {job.type} • {job.location || 'No location specified'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={job.isActive ? 'default' : 'secondary'}>
                              {job.isActive ? 'Active' : 'Closed'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                          {job.description.length > 200 
                            ? `${job.description.substring(0, 200)}...` 
                            : job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skillsRequired && job.skillsRequired.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-1" />
                            {job.applications ? job.applications.length : 0} applications
                          </div>
                          {job.deadline && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-wrap justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                        >
                          View Applicants
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleToggleStatus(job._id, job.isActive)}
                        >
                          {job.isActive ? 'Close Job' : 'Reopen Job'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No jobs found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No jobs match your search criteria.' : 'Get started by posting your first job.'}
                  </p>
                  <div className="mt-6">
                    <Button onClick={handlePostNewJob}>
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Job
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
