
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Send } from "lucide-react";
import { communityService } from '@/services/api/communityService';
import { CommunityPost, PostComment } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';

// Helper function to safely access author name
const getAuthorName = (author: any): string => {
  if (typeof author === 'string') return 'Unknown';
  return author?.name || 'Unknown';
};

// Helper function to safely format dates
const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to get the number of comments for a post
const getCommentsCount = (post: CommunityPost): number => {
  // Handle different possible comment structures
  if (typeof post.comments === 'number') {
    return post.comments;
  }
  if (Array.isArray(post.comments)) {
    return post.comments.length;
  }
  return 0; // Default to 0 if no comments property or invalid type
};

const CommunityHub = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await communityService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching community posts:', error);
        toast({
          title: "Error",
          description: "Failed to load community posts. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchComments = async (postId: string) => {
    if (!postId) return;
    
    try {
      setCommentsLoading(true);
      const data = await communityService.getPostComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newPost = await communityService.createPost({
        title: newPostTitle,
        content: newPostContent
      });
      
      // Cast the newPost to match the expected type
      setPosts([newPost as CommunityPost, ...posts]);
      setCreatePostDialogOpen(false);
      setNewPostTitle('');
      setNewPostContent('');
      
      toast({
        title: "Success",
        description: "Your post has been published!"
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddComment = async () => {
    if (!activePost || !newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment.",
        variant: "destructive"
      });
      return;
    }

    try {
      const comment = await communityService.addComment(activePost._id, { 
        content: newComment 
      });
      
      setComments([...comments, comment]);
      setNewComment('');
      
      // Update post comment count in the posts list
      const updatedPosts = posts.map(post => {
        if (post._id === activePost._id) {
          const updatedPost = {...post};
          if (typeof updatedPost.comments === 'number') {
            updatedPost.comments = updatedPost.comments + 1;
          } else if (Array.isArray(updatedPost.comments)) {
            updatedPost.comments = [...updatedPost.comments, comment];
          } else {
            updatedPost.comments = 1; // Initialize as number if not set
          }
          return updatedPost;
        }
        return post;
      });
      setPosts(updatedPosts);
      
      // Update active post comment count
      if (activePost) {
        const updatedActivePost = {...activePost};
        if (typeof updatedActivePost.comments === 'number') {
          updatedActivePost.comments = updatedActivePost.comments + 1;
        } else if (Array.isArray(updatedActivePost.comments)) {
          updatedActivePost.comments = [...updatedActivePost.comments, comment];
        } else {
          updatedActivePost.comments = 1; // Initialize as number if not set
        }
        setActivePost(updatedActivePost);
      }
      
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await communityService.likePost(postId);
      
      // Update posts with new like count
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            likes: response.likes
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      
      // Update active post if it's the one being liked
      if (activePost && activePost._id === postId) {
        setActivePost({
          ...activePost,
          likes: response.likes
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post. You may have already liked it.",
        variant: "destructive"
      });
    }
  };

  const openPostDetails = (post: CommunityPost) => {
    setActivePost(post);
    fetchComments(post._id);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Community Hub</h1>
              <Skeleton className="h-10 w-32" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3 space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-2" />
                      <Skeleton className="h-4 w-4/6" />
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex justify-between">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="w-full">
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        </div>
                      ))}
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
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Community Hub</h1>
            <Dialog open={createPostDialogOpen} onOpenChange={setCreatePostDialogOpen}>
              <DialogTrigger asChild>
                <Button>Create Post</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Title
                    </label>
                    <Input 
                      placeholder="Enter a title for your post"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <Textarea 
                      placeholder="What's on your mind?"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleCreatePost}
                  >
                    Publish Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {posts.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center text-center p-6">
                        <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                        <p className="text-gray-500 mb-4">Be the first to start a conversation</p>
                        <Button onClick={() => setCreatePostDialogOpen(true)}>Create Post</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    posts.map((post) => (
                      <Card key={post._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getAuthorName(post.author).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{getAuthorName(post.author)}</p>
                              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <p className="text-gray-600">{post.content}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center space-x-1"
                              onClick={() => handleLikePost(post._id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center space-x-1"
                              onClick={() => openPostDetails(post)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>
                                {getCommentsCount(post)}
                              </span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="space-y-6">
                  {posts
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 5)
                    .map((post) => (
                      <Card key={post._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getAuthorName(post.author).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{getAuthorName(post.author)}</p>
                              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <p className="text-gray-600">{post.content}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center space-x-1"
                              onClick={() => handleLikePost(post._id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center space-x-1"
                              onClick={() => openPostDetails(post)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>
                                {getCommentsCount(post)}
                              </span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
                
                <TabsContent value="recent" className="space-y-6">
                  {posts
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map((post) => (
                      <Card key={post._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getAuthorName(post.author).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{getAuthorName(post.author)}</p>
                              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent 
                          className="cursor-pointer" 
                          onClick={() => openPostDetails(post)}
                        >
                          <p className="text-gray-600">{post.content}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center space-x-1"
                              onClick={() => handleLikePost(post._id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center space-x-1"
                              onClick={() => openPostDetails(post)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>
                                {getCommentsCount(post)}
                              </span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activePost ? 'Comments' : 'Community Discussion'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[600px] overflow-y-auto">
                  {activePost ? (
                    <div className="space-y-4">
                      {commentsLoading ? (
                        <>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex space-x-3">
                              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                              <div className="w-full">
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6 mt-1" />
                              </div>
                            </div>
                          ))}
                        </>
                      ) : comments.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                          No comments yet. Be the first to comment!
                        </div>
                      ) : (
                        comments.map((comment) => (
                          <div key={comment._id} className="flex space-x-3">
                            <Avatar>
                              <AvatarFallback>{getAuthorName(comment.author).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-sm">{getAuthorName(comment.author)}</p>
                                <Badge variant="outline" className="text-xs">
                                  {typeof comment.author === 'object' && comment.author !== null 
                                    ? comment.author.role 
                                    : 'user'}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                      
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex space-x-3">
                          <Avatar>
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              rows={2}
                            />
                            <Button 
                              className="mt-2" 
                              size="sm"
                              onClick={handleAddComment}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-gray-500">
                        Select a post to view and participate in the discussion
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
