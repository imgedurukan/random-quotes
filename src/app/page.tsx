'use client';

import { Button } from '@/components/Button';
import { useContext } from 'react';
import { H3 } from '@/components/typography/H3';
import { QuotesContext } from '@/app/QuotesContext';

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote } =
    useContext(QuotesContext);

  const { quote, author, likedBy, isLiked } = quotes[quoteIndex];

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-950 transition-colors duration-300 px-4'>
      <section className='bg-slate-50/80 dark:bg-slate-900 rounded-md p-6 sm:p-10 flex flex-col border border-slate-200 dark:border-slate-800 shadow-md transition-colors duration-300'>
        <div className='self-end'>
          <Button variant={'icon'} onClick={handleLikeQuote}>
            {isLiked ? '❤️' : '🤍'}
            <span className='font-bold text-slate-900 dark:text-slate-100 ml-1'>
              {likedBy ?? 0}
            </span>
          </Button>
        </div>
        <H3 element='p' className='text-slate-900'>
          {quote}
        </H3>
        <span className='text-md font-semibold text-slate-700 dark:text-slate-300 self-end mt-2'>
          - {author}
        </span>
        <div className='mt-6 flex flex-col'>
          <Button variant={'primary'} onClick={handleQuoteIndexUpdate}>
            Next Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
