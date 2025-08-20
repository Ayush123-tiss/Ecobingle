import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import ThreadCard from '@/components/ThreadCard';
import CommunityCard from '@/components/CommunityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, MessageSquare, Leaf } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  community: string;
  votes: number;
  comments: number;
  createdAt: string;
  tags?: string[];
}

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  color: string;
}

const fetchThreads = async (): Promise<Thread[]> => {
  const response = await fetch('/api/threads');
  if (!response.ok) {
    throw new Error('Failed to fetch threads');
  }
  return response.json();
};

const fetchCommunities = async (): Promise<Community[]> => {
  const response = await fetch('/api/communities');
  if (!response.ok) {
    throw new Error('Failed to fetch communities');
  }
  return response.json();
};

export default function HomePage() {
  const { data: threads = [], isLoading: threadsLoading } = useQuery({
    queryKey: ['threads'],
    queryFn: fetchThreads,
  });

  const { data: communities = [], isLoading: communitiesLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });

  const trendingThreads = threads.slice(0, 5);
  const topCommunities = communities.slice(0, 6);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eco-green to-eco-blue rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Welcome to EcoBingle</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">
            Join the conversation about sustainability, environmental protection, and green living.
          </p>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{communities.reduce((acc, c) => acc + c.members, 0).toLocaleString()} Members</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{threads.length} Active Discussions</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trending" className="space-y-4">
                {threadsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  trendingThreads.map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                {threadsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  threads.map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="space-y-4">
                {threadsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  threads
                    .sort((a, b) => b.votes - a.votes)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} />
                    ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Communities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Communities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {communitiesLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  ))
                ) : (
                  topCommunities.map((community) => (
                    <CommunityCard key={community.id} community={community} compact />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Communities</span>
                  <Badge variant="secondary">{communities.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Discussions</span>
                  <Badge variant="secondary">{threads.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <Badge variant="secondary">
                    {communities.reduce((acc, c) => acc + c.members, 0).toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}