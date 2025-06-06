
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { applicationService } from '@/services/api/applicationService';
import { Application, Opportunity, User } from '@/services/api/types';

const ApplicationTracker = () => {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['studentApplications'],
    queryFn: applicationService.getStudentApplications
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !applications) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Unable to load applications. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Filter out applications with null opportunities and take the most recent ones
  const validApplications = applications
    .filter((app: Application) => app.opportunity !== null)
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'under review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getOrganizationName = (organization: any) => {
    if (typeof organization === 'string') {
      return organization;
    }
    if (typeof organization === 'object' && organization !== null) {
      return organization.organization || 
             `${organization.firstName || ''} ${organization.lastName || ''}`.trim() ||
             organization.name ||
             'Unknown Organization';
    }
    return 'Unknown Organization';
  };

  const getOpportunityTitle = (opportunity: string | Opportunity): string => {
    if (typeof opportunity === 'object' && opportunity !== null) {
      return opportunity.title || 'N/A';
    }
    return 'N/A';
  };

  const getOpportunityLocation = (opportunity: string | Opportunity): string => {
    if (typeof opportunity === 'object' && opportunity !== null) {
      return opportunity.location || 'N/A';
    }
    return 'N/A';
  };

  const getOpportunityOrganization = (opportunity: string | Opportunity): any => {
    if (typeof opportunity === 'object' && opportunity !== null) {
      return opportunity.organization;
    }
    return 'N/A';
  };

  const getOpportunityId = (opportunity: string | Opportunity): string => {
    if (typeof opportunity === 'object' && opportunity !== null) {
      return opportunity.id || opportunity._id || '';
    }
    return typeof opportunity === 'string' ? opportunity : '';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Application Status</CardTitle>
        <Link to="/student/applications" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        {validApplications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <Building className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No applications found</p>
              <p className="text-sm">Start applying to opportunities to see them here</p>
            </div>
            <Link to="/student/explore">
              <Button>Explore Opportunities</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {validApplications.map((application: Application) => (
              <div
                key={application.id || application._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {getOpportunityTitle(application.opportunity)}
                    </h3>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {getOrganizationName(getOpportunityOrganization(application.opportunity))}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {getOpportunityLocation(application.opportunity)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Applied {formatDate(application.appliedAt || application.appliedDate || '')}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Link to={`/student/opportunity/${getOpportunityId(application.opportunity)}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
