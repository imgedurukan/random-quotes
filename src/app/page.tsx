'use client';

import { useContext } from 'react';
import { QuotesContext } from '@/app/QuotesContext';
import { QuoteCard } from '@/components/QuoteCard';
import { Button } from '@/components/ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();
  const {
    quotes,
    quoteIndex,
    isLoading,
    error,
    handleQuoteIndexUpdate,
    handleLikeQuote,
  } = useContext(QuotesContext);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-65px)] flex items-center justify-center">
        <p className="text-lg">Loading quotes…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-65px)] flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </main>
    );
  }

  const currentQuote = quotes[quoteIndex];

  if (!currentQuote) {
    return (
      <main className="min-h-[calc(100vh-65px)] flex items-center justify-center">
        <p>No quotes found in database.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full flex flex-col items-center gap-6">
        <QuoteCard
          quote={currentQuote.quote}
          author={currentQuote.author}
          likedBy={currentQuote.likedBy ?? 0}
          currentUserId={user?.sub ?? ''}
          onToggleLike={() => handleLikeQuote()}
        />

        <Button
          variant="outline"
          size="lg"
          onClick={handleQuoteIndexUpdate}
          className="w-full sm:w-auto px-8 font-medium border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-200 shadow-sm cursor-pointer"
        >
          Next Quote ✨
        </Button>
      </div>
    </main>
  );
}