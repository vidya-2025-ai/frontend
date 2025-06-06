
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Briefcase, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { opportunityService } from '@/services/api/opportunityService';

const RecommendedOpportunities = () => {
  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['recommendedOpportunities'],
    queryFn: () => opportunityService.getAllOpportunities({ 
      limit: 4,
      recommended: true 
    })
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended For You</h2>
          <Link to="/student/explore" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !opportunities) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended For You</h2>
          <Link to="/student/explore" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Unable to load recommendations. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const getOrganizationName = (organization: any) => {
    if (typeof organization === 'string') {
      return organization;
    }
    if (typeof organization === 'object' && organization !== null) {
      return organization.organization || 
             `${organization.firstName || ''} ${organization.lastName || ''}`.trim() ||
             'Unknown Organization';
    }
    return 'Unknown Organization';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended For You</h2>
        <Link to="/student/explore" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{getOrganizationName(opportunity.organization)}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300">
                    {opportunity.type}
                  </Badge>
                  {opportunity.createdAt && new Date(opportunity.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <Badge className="bg-green-500 text-white">New</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.location || 'Not specified'}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.duration || 'Not specified'}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.category || 'General'}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Match</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/student/opportunity/${opportunity.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedOpportunities;
