import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, MessageSquare, PlusCircle, Send } from "lucide-react";
import { grievanceService } from '@/services/api/grievanceService';
import { Grievance, GrievanceResponse } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Helper function to safely format dates
const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to safely get name from user or string
const getName = (user: any): string => {
  if (typeof user === 'string') return 'Unknown';
  return user?.name || 'Unknown';
};

const GrievanceSystem = () => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [newGrievanceTitle, setNewGrievanceTitle] = useState('');
  const [newGrievanceDescription, setNewGrievanceDescription] = useState('');
  const [newGrievanceCategory, setNewGrievanceCategory] = useState('general'); // Added category state
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setIsLoading(true);
        const data = await grievanceService.getGrievances();
        // Ensure we have the correct TypeScript typing
        const formattedData = data.map(grievance => ({
          ...grievance,
          // Ensure status is of the correct type
          status: grievance.status as "open" | "under-review" | "resolved" | "closed"
        }));
        setGrievances(formattedData);
      } catch (error) {
        console.error('Error fetching grievances:', error);
        toast({
          title: "Error",
          description: "Failed to load grievances. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  const handleSubmitGrievance = async () => {
    if (!newGrievanceTitle.trim() || !newGrievanceDescription.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and description for your grievance.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const grievance = await grievanceService.fileGrievance({
        title: newGrievanceTitle,
        description: newGrievanceDescription,
        category: newGrievanceCategory // Added category field
      });

      // Ensure we have the correct TypeScript typing
      const formattedGrievance = {
        ...grievance,
        // Ensure status is of the correct type
        status: grievance.status as "open" | "under-review" | "resolved" | "closed"
      };

      setGrievances([formattedGrievance, ...grievances]);
      setCreateDialogOpen(false);
      setNewGrievanceTitle('');
      setNewGrievanceDescription('');
      setNewGrievanceCategory('general'); // Reset category
      
      toast({
        title: "Success",
        description: "Your grievance has been submitted successfully."
      });
    } catch (error) {
      console.error('Error submitting grievance:', error);
      toast({
        title: "Error",
        description: "Failed to submit grievance. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddResponse = async () => {
    if (!selectedGrievance || !responseContent.trim()) {
      toast({
        title: "Error",
        description: "Please provide a response.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await grievanceService.respondToGrievance(
        selectedGrievance._id, 
        { content: responseContent }
      );

      // Add the new response to the selected grievance
      const updatedGrievance = {
        ...selectedGrievance,
        responses: [...selectedGrievance.responses, response]
      };
      setSelectedGrievance(updatedGrievance);

      // Update the grievance in the list
      const updatedGrievances = grievances.map(g => {
        if (g._id === selectedGrievance._id) {
          return updatedGrievance;
        }
        return g;
      });
      setGrievances(updatedGrievances);

      setResponseContent('');
      
      toast({
        title: "Success",
        description: "Your response has been added."
      });
    } catch (error) {
      console.error('Error adding response:', error);
      toast({
        title: "Error",
        description: "Failed to add response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseGrievance = async (grievanceId: string) => {
    try {
      await grievanceService.closeGrievance(grievanceId);
      
      // Update the grievance status in the list
      const updatedGrievances = grievances.map(g => {
        if (g._id === grievanceId) {
          return { ...g, status: 'closed' as "closed" };
        }
        return g;
      });
      setGrievances(updatedGrievances);
      
      // Update selected grievance if it's the one being closed
      if (selectedGrievance && selectedGrievance._id === grievanceId) {
        setSelectedGrievance({ ...selectedGrievance, status: 'closed' as "closed" });
      }
      
      toast({
        title: "Success",
        description: "Grievance has been closed."
      });
    } catch (error) {
      console.error('Error closing grievance:', error);
      toast({
        title: "Error",
        description: "Failed to close grievance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case 'under-review':
        return <Badge className="bg-amber-100 text-amber-800">Under Review</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Grievance System</h1>
              <Skeleton className="h-10 w-32" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </CardContent>
                      <CardFooter>
                        <div className="w-full flex justify-between items-center">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-24" />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-3">
                <Card className="h-full">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      
                      <div className="mt-6">
                        <Skeleton className="h-6 w-1/4 mb-4" />
                        {[1, 2].map((i) => (
                          <div key={i} className="flex space-x-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                            <div className="w-full">
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-3 w-24 mb-2" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Grievance System</h1>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  File Grievance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>File a New Grievance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input 
                      placeholder="Briefly describe the issue"
                      value={newGrievanceTitle}
                      onChange={(e) => setNewGrievanceTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Select value={newGrievanceCategory} onValueChange={setNewGrievanceCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea 
                      placeholder="Provide details about your grievance"
                      value={newGrievanceDescription}
                      onChange={(e) => setNewGrievanceDescription(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleSubmitGrievance}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="all">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="open" className="flex-1">Open</TabsTrigger>
                  <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {grievances.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center text-center p-6">
                        <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No grievances filed</h3>
                        <p className="text-gray-500 mb-4">
                          You haven't filed any grievances yet
                        </p>
                        <Button onClick={() => setCreateDialogOpen(true)}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          File Grievance
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    grievances.map((grievance) => (
                      <Card 
                        key={grievance._id} 
                        className={`hover:shadow-lg transition-shadow ${
                          selectedGrievance?._id === grievance._id ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg cursor-pointer" onClick={() => setSelectedGrievance(grievance)}>
                            {grievance.title}
                          </CardTitle>
                          <CardDescription>
                            {formatDate(grievance.createdAt)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-gray-600 line-clamp-2">{grievance.description}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between items-center">
                            {getStatusBadge(grievance.status)}
                            <div className="flex items-center text-gray-500 text-sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{grievance.responses.length} responses</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="open" className="space-y-4">
                  {grievances.filter(g => g.status.toLowerCase() !== 'resolved' && g.status.toLowerCase() !== 'closed').length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center text-center p-6">
                        <CheckCircle className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No open grievances</h3>
                        <p className="text-gray-500 mb-4">
                          You don't have any unresolved grievances
                        </p>
                        <Button onClick={() => setCreateDialogOpen(true)}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          File Grievance
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    grievances
                      .filter(g => g.status.toLowerCase() !== 'resolved' && g.status.toLowerCase() !== 'closed')
                      .map((grievance) => (
                        <Card 
                          key={grievance._id} 
                          className={`hover:shadow-lg transition-shadow ${
                            selectedGrievance?._id === grievance._id ? 'ring-2 ring-primary' : ''
                          }`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg cursor-pointer" onClick={() => setSelectedGrievance(grievance)}>
                              {grievance.title}
                            </CardTitle>
                            <CardDescription>
                              {formatDate(grievance.createdAt)}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-gray-600 line-clamp-2">{grievance.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="w-full flex justify-between items-center">
                              {getStatusBadge(grievance.status)}
                              <div className="flex items-center text-gray-500 text-sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{grievance.responses.length} responses</span>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="resolved" className="space-y-4">
                  {grievances.filter(g => g.status.toLowerCase() === 'resolved' || g.status.toLowerCase() === 'closed').length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center text-center p-6">
                        <Clock className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No resolved grievances</h3>
                        <p className="text-gray-500 mb-4">
                          None of your grievances have been resolved yet
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    grievances
                      .filter(g => g.status.toLowerCase() === 'resolved' || g.status.toLowerCase() === 'closed')
                      .map((grievance) => (
                        <Card 
                          key={grievance._id} 
                          className={`hover:shadow-lg transition-shadow ${
                            selectedGrievance?._id === grievance._id ? 'ring-2 ring-primary' : ''
                          }`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg cursor-pointer" onClick={() => setSelectedGrievance(grievance)}>
                              {grievance.title}
                            </CardTitle>
                            <CardDescription>
                              {formatDate(grievance.createdAt)}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-gray-600 line-clamp-2">{grievance.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="w-full flex justify-between items-center">
                              {getStatusBadge(grievance.status)}
                              <div className="flex items-center text-gray-500 text-sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{grievance.responses.length} responses</span>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:col-span-3">
              {selectedGrievance ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedGrievance.title}</CardTitle>
                        <CardDescription>
                          Filed on {formatDate(selectedGrievance.createdAt)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(selectedGrievance.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">{selectedGrievance.description}</p>
                      <div className="flex justify-end mt-2">
                        <span className="text-sm text-gray-500">
                          - {getName(selectedGrievance.createdBy)} ({typeof selectedGrievance.createdBy === 'object' && selectedGrievance.createdBy !== null ? selectedGrievance.createdBy.role : 'student'})
                        </span>
                      </div>
                    </div>

                    {selectedGrievance.status.toLowerCase() === 'closed' && (
                      <Alert variant="destructive" className="bg-gray-50 border-gray-200 text-gray-800">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This grievance has been closed and cannot receive further responses.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Responses</h3>
                      {selectedGrievance.responses.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No responses yet</p>
                      ) : (
                        selectedGrievance.responses.map((response) => (
                          <div key={response._id} className="flex space-x-3">
                            <Avatar>
                              <AvatarFallback>{getName(response.responder).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-sm">{getName(response.responder)}</p>
                                <Badge variant="outline" className="text-xs">
                                  {typeof response.responder === 'object' && response.responder !== null ? response.responder.role : ''}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {formatDate(response.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-1">{response.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {selectedGrievance.status.toLowerCase() !== 'closed' && (
                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium mb-2">Add Response</h3>
                        <div className="flex space-x-3">
                          <Avatar>
                            <AvatarFallback>S</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Add your response..."
                              value={responseContent}
                              onChange={(e) => setResponseContent(e.target.value)}
                              rows={3}
                            />
                            <div className="flex justify-between mt-2">
                              <Button 
                                variant="secondary" 
                                onClick={() => handleCloseGrievance(selectedGrievance._id)}
                              >
                                Close Grievance
                              </Button>
                              <Button onClick={handleAddResponse} disabled={isSubmitting}>
                                <Send className="h-4 w-4 mr-2" />
                                {isSubmitting ? 'Sending...' : 'Send Response'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center text-center py-16">
                    <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No grievance selected</h3>
                    <p className="text-gray-500 max-w-md">
                      Select a grievance from the list to view its details or file a new grievance
                    </p>
                    <Button className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      File New Grievance
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceSystem;
