'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { QuotesContext } from '@/app/QuotesContext';
import { QuoteCard } from '@/components/QuoteCard';
import { H3 } from '@/components/typography/H3';
import { Button } from '@/components/ui/button';

const CURRENT_USER_ID = '123';

export default function LikedQuotesPage() {
  const { quotes, handleToggleLike } = useContext(QuotesContext);

  const likedQuotes = quotes
    .map((quote, originalIndex) => ({ ...quote, originalIndex }))
    .filter((quote) => quote.likedBy.includes(CURRENT_USER_ID));

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <H3 element="h1" className="text-2xl font-bold text-[var(--text-primary)]">
          Liked Quotes
        </H3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Your favorite quotes collection
        </p>
      </div>

      {likedQuotes.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-xl">
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            You haven't liked any quotes yet.
          </p>
          <Link href="/">
            <Button variant="default">Browse Quotes</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {likedQuotes.map((item) => (
            <QuoteCard
              key={item.originalIndex}
              quote={item.quote}
              author={item.author}
              likedBy={item.likedBy}
              currentUserId={CURRENT_USER_ID}
              onToggleLike={() => handleToggleLike(item.originalIndex)}
              showUnlikeButton={true}
            />
          ))}
        </div>
      )}
    </main>
  );
}