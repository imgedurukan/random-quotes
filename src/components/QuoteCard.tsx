'use client';

import { H3 } from '@/components/typography/H3';
import { H6 } from '@/components/typography/H6';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

interface QuoteCardProps {
  quote: string;
  author: string;
  likedBy: string[];
  currentUserId: string;
  onToggleLike: () => void;
  showUnlikeButton?: boolean;
}

export function QuoteCard({
  quote,
  author,
  likedBy,
  currentUserId,
  onToggleLike,
  showUnlikeButton = false,
}: QuoteCardProps) {
  const isLiked = likedBy.includes(currentUserId);
  const likeCount = likedBy.length;

  return (
    <Card className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px] p-2">
      <CardHeader className="flex flex-row justify-end p-4 pb-0 border-none">
        {showUnlikeButton ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={onToggleLike}
            className="text-xs h-8 px-3 font-medium cursor-pointer"
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLike}
            className="flex items-center gap-1.5 hover:bg-[var(--bg-primary)] h-8 px-2 cursor-pointer"
          >
            <span className="text-xl leading-none">{isLiked ? '❤️' : '🤍'}</span>
            <span className="font-semibold text-[var(--text-primary)] text-sm">
              {likeCount}
            </span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-6 py-4 flex flex-col justify-center flex-grow gap-4 border-none">
        <H3 element="p" className="italic text-center">
          "{quote}"
        </H3>

        <H6 element="p">{author}</H6>
      </CardContent>
    </Card>
  );
}