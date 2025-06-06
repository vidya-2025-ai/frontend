
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { applicationService } from '@/services/api/applicationService';
import { certificateService } from '@/services/api/certificateService';

const StudentStats = () => {
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['studentApplications'],
    queryFn: applicationService.getStudentApplications
  });

  const { data: certificates, isLoading: isLoadingCertificates } = useQuery({
    queryKey: ['studentCertificates'],
    queryFn: certificateService.getAllCertificates
  });

  const isLoading = isLoadingApplications || isLoadingCertificates;

  // Calculate stats from real data
  const stats = React.useMemo(() => {
    if (!applications) {
      return {
        applications: 0,
        inProgress: 0,
        completed: 0,
        certificates: 0,
      };
    }

    const inProgress = applications.filter(app => 
      app.status === 'Pending' || app.status === 'Under Review' || app.status === 'Interview'
    ).length;
    
    const completed = applications.filter(app => 
      app.status === 'Accepted' || app.status === 'Rejected'
    ).length;
    
    return {
      applications: applications.length,
      inProgress,
      completed,
      certificates: certificates?.length || 0,
    };
  }, [applications, certificates]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="vs-card">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <Skeleton className="h-5 w-5" />
                </div>
                <div>
                  <Skeleton className="h-6 w-8 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsConfig = [
    {
      name: 'Applications',
      value: stats.applications.toString(),
      icon: Briefcase,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      name: 'In Progress',
      value: stats.inProgress.toString(),
      icon: Clock,
      iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300'
    },
    {
      name: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircle,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
    },
    {
      name: 'Certificates',
      value: stats.certificates.toString(),
      icon: Award,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsConfig.map((stat) => (
        <Card key={stat.name} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.iconColor} mr-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentStats;
