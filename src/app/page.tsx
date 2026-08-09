'use client';

import { useContext } from 'react';
import { QuotesContext } from '@/app/QuotesContext';
import { QuoteCard } from '@/components/QuoteCard';
import { Button } from '@/components/ui/button';

const CURRENT_USER_ID = '123';

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleToggleLike } =
    useContext(QuotesContext);

  const currentQuote = quotes[quoteIndex];

  if (!currentQuote) return null;

  return (
    <main className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full flex flex-col items-center gap-6">
        <QuoteCard
          quote={currentQuote.quote}
          author={currentQuote.author}
          likedBy={currentQuote.likedBy}
          currentUserId={CURRENT_USER_ID}
          onToggleLike={() => handleToggleLike()}
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