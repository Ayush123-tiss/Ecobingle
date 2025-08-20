import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface ThreadCardProps {
  thread: Thread;
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  const [userVote, setUserVote] = React.useState<'up' | 'down' | null>(null);
  const [currentVotes, setCurrentVotes] = React.useState(thread.votes);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      // Remove vote
      setUserVote(null);
      setCurrentVotes(thread.votes);
    } else {
      // Add or change vote
      const voteChange = type === 'up' ? 1 : -1;
      const previousVoteChange = userVote === 'up' ? -1 : userVote === 'down' ? 1 : 0;
      setUserVote(type);
      setCurrentVotes(thread.votes + voteChange + previousVoteChange);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder-avatar-${thread.author}.jpg`} />
              <AvatarFallback>{thread.author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href={`/community/${thread.community}`}>
                  <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer">
                    {thread.community}
                  </Badge>
                </Link>
                <span>•</span>
                <span>by {thread.author}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Link href={`/thread/${thread.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer line-clamp-2">
            {thread.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {thread.content}
        </p>
        
        {thread.tags && thread.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {thread.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Voting */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                className={`h-8 w-8 p-0 ${userVote === 'up' ? 'text-orange-500 bg-orange-50' : ''}`}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[2rem] text-center">
                {currentVotes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                className={`h-8 w-8 p-0 ${userVote === 'down' ? 'text-blue-500 bg-blue-50' : ''}`}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Comments */}
            <Link href={`/thread/${thread.id}`}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.comments}</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}