
// Export all services from a single file for convenience
import authService from './authService';
import applicationService from './applicationService';
import opportunityService from './opportunityService';
import certificateService from './certificateService';
import calendarService from './calendarService';
import skillService from './skillService';
import resumeService from './resumeService';
import atsService from './atsService';
import mentorshipService from './mentorshipService';
import communityService from './communityService';
import grievanceService from './grievanceService';
import challengeService from './challengeService';
import microInternshipService from './microInternshipService';
import userService from './userService';
import dashboardService from './dashboardService';
import skillAssessmentService from './skillAssessmentService';
import candidateService from './candidateService';

// Also export all types
import type {
  User,
  Application,
  Event,
  CommunityPost,
  PostComment,
  Grievance,
  GrievanceResponse,
  Challenge,
  ChallengeSolution,
  MentorshipRequest,
  PaginatedResponse,
  Resume,
  Certificate,
  ATSParameter,
  Opportunity,
  Skill,
  UserSkill,
  MicroInternship,
  MicroInternshipApplication,
  ApplicationStats,
  RegisterData
} from './types';

// Export candidate service types
import type { CandidateFilters, CandidateStatistics } from './candidateService';

export {
  // Services
  authService,
  applicationService,
  opportunityService,
  certificateService,
  calendarService,
  skillService,
  resumeService,
  atsService,
  mentorshipService,
  communityService,
  grievanceService,
  challengeService,
  microInternshipService,
  userService,
  dashboardService,
  skillAssessmentService,
  candidateService,
  
  // Types - using 'export type' for all type exports
  type User,
  type Application,
  type Event,
  type CommunityPost,
  type PostComment,
  type Grievance,
  type GrievanceResponse,
  type Challenge,
  type ChallengeSolution,
  type MentorshipRequest,
  type PaginatedResponse,
  type Resume,
  type Certificate,
  type ATSParameter,
  type Opportunity,
  type Skill,
  type UserSkill,
  type MicroInternship,
  type MicroInternshipApplication,
  type ApplicationStats,
  type RegisterData,
  type CandidateFilters,
  type CandidateStatistics
};
