'use client';

import { quotes as initialQuotes } from '@/quotes';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { H3 } from '@/components/typography/H3';
import { H6 } from '@/components/typography/H6';

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuote = quotes[quoteIndex];

  function handleNextQuote() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === quoteIndex && quotes.length > 1);

    setQuoteIndex(randomIndex);
  }

  function handleLike() {
    const nextQuotes = quotes.map((q, i) => {
      if (i === quoteIndex) {
        const isCurrentlyLiked = q.isLiked || false;

        return {
          ...q,
          likeCount: isCurrentlyLiked ? q.likeCount - 1 : q.likeCount + 1,
          isLiked: !isCurrentlyLiked,
        };
      }
      return q;
    });
    setQuotes(nextQuotes);
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200 p-4'>
      <section className='bg-slate-50/50 rounded-md p-10 flex flex-col w-full max-w-lg min-h-[250px] justify-center shadow-sm'>
        {}
        <H3 element='p'>{currentQuote.quote}</H3>
        <H6 element='span' className='mt-2 text-slate-500 italic'>
          {currentQuote.author}
        </H6>

        <p className='mt-4 text-sm font-bold text-blue-600'>
          Likes: {currentQuote.likeCount}
        </p>

        <div className='mt-6 flex flex-col gap-2'>
          <Button variant={'primary'} onClick={handleNextQuote}>
            Next Quote
          </Button>

          <Button
            variant={currentQuote.isLiked ? 'primary' : 'secondary'}
            onClick={handleLike}
          >
            {currentQuote.isLiked ? 'Liked ❤️' : 'Like 👍'}
          </Button>
        </div>
      </section>
    </main>
  );
}
