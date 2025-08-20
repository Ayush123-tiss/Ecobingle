import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  color: string;
}

interface CommunityCardProps {
  community: Community;
  compact?: boolean;
}

export default function CommunityCard({ community, compact = false }: CommunityCardProps) {
  const [isJoined, setIsJoined] = React.useState(false);

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsJoined(!isJoined);
  };

  if (compact) {
    return (
      <Link href={`/community/${community.id}`}>
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: community.color }}
            >
              {community.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{community.name}</p>
              <p className="text-xs text-muted-foreground">
                {community.members.toLocaleString()} members
              </p>
            </div>
          </div>
          <Button
            variant={isJoined ? "secondary" : "outline"}
            size="sm"
            onClick={handleJoin}
            className="h-7 px-2"
          >
            {isJoined ? "Joined" : <Plus className="w-3 h-3" />}
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <Link href={`/community/${community.id}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                style={{ backgroundColor: community.color }}
              >
                {community.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                  {community.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{community.members.toLocaleString()} members</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {community.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {community.members > 10000 ? 'Large' : community.members > 1000 ? 'Medium' : 'Small'} Community
          </Badge>
          <Button
            variant={isJoined ? "secondary" : "default"}
            size="sm"
            onClick={handleJoin}
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}