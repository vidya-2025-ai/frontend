import api from './index';
import { CommunityPost, PostComment, PaginatedResponse } from './types';

export interface PostFilters {
  search?: string;
  author?: string;
  sortBy?: 'latest' | 'popular';
  page?: number;
  limit?: number;
}

export interface CommunityStatistics {
  totalPosts: number;
  totalComments: number;
  activePosts: number;
  totalLikes: number;
  topContributors: {
    userId: string;
    name: string;
    role: string;
    postCount: number;
  }[];
  postsByDay: {
    date: string;
    count: number;
  }[];
}

export const communityService = {
  // Post related endpoints
  getPosts: async (filters: PostFilters = {}): Promise<CommunityPost[]> => {
    const response = await api.get<PaginatedResponse<CommunityPost>>('/community/posts', { 
      params: filters 
    });
    return response.data.posts || response.data.data || [];
  },
  
  getRecruiterPosts: async (filters: PostFilters = {}): Promise<CommunityPost[]> => {
    const response = await api.get<PaginatedResponse<CommunityPost>>('/community/recruiter', { 
      params: filters 
    });
    return response.data.posts || response.data.data || [];
  },
  
  getPostById: async (id: string): Promise<CommunityPost> => {
    const response = await api.get<CommunityPost>(`/community/posts/${id}`);
    return response.data;
  },
  
  createPost: async (postData: { title: string, content: string }): Promise<CommunityPost> => {
    const response = await api.post<CommunityPost>('/community/posts', postData);
    return response.data;
  },
  
  updatePost: async (id: string, postData: { title?: string, content?: string }): Promise<CommunityPost> => {
    const response = await api.put<CommunityPost>(`/community/posts/${id}`, postData);
    return response.data;
  },
  
  deletePost: async (id: string): Promise<void> => {
    await api.delete<void>(`/community/posts/${id}`);
  },
  
  // Comment related endpoints
  getPostComments: async (postId: string): Promise<PostComment[]> => {
    const response = await api.get<PostComment[]>(`/community/posts/${postId}/comments`);
    return response.data;
  },
  
  addComment: async (postId: string, commentData: { content: string }): Promise<PostComment> => {
    const response = await api.post<PostComment>(`/community/posts/${postId}/comments`, commentData);
    return response.data;
  },
  
  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    await api.delete<void>(`/community/posts/${postId}/comments/${commentId}`);
  },
  
  // Interaction related endpoints
  likePost: async (postId: string): Promise<{ id: string, likes: number }> => {
    const response = await api.post<{ id: string, likes: number }>(`/community/posts/${postId}/like`);
    return response.data;
  },
  
  unlikePost: async (postId: string): Promise<{ id: string, likes: number }> => {
    const response = await api.post<{ id: string, likes: number }>(`/community/posts/${postId}/unlike`);
    return response.data;
  },
  
  // Statistics endpoints
  getCommunityStatistics: async (): Promise<CommunityStatistics> => {
    const response = await api.get<CommunityStatistics>('/community/statistics');
    return response.data;
  },
  
  getFeaturedPosts: async (limit: number = 3): Promise<CommunityPost[]> => {
    const response = await api.get<CommunityPost[]>('/community/posts/featured', {
      params: { limit }
    });
    return response.data;
  }
};

export default communityService;
