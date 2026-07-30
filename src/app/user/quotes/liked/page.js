'use client';

import { useContext } from 'react';
import { QuotesContext } from '@/app/QuotesContext';
import { H3 } from '@/components/typography/H3';
import { Button } from '@/components/Button';

export default function LikedQuotesPage() {
  const { quotes, handleUnlikeQuote } = useContext(QuotesContext);

  const likedQuotes = quotes
    .map((quote, originalIndex) => ({ ...quote, originalIndex }))
    .filter((quote) => quote.likedBy > 0);

  return (
    <main className='min-h-screen flex flex-col items-center justify-start bg-slate-200 p-8'>
      <div className='w-full max-w-2xl bg-white rounded-md p-6 shadow-md mt-10'>
        <H3
          element='h1'
          className='text-2xl font-bold mb-6 text-slate-800 border-b pb-2'
        >
          ❤️ Liked Quotes
        </H3>

        {likedQuotes.length === 0 ? (
          <p className='text-slate-500 text-center py-4'>
            You haven't liked any quotes yet.
          </p>
        ) : (
          <div className='flex flex-col gap-4'>
            {likedQuotes.map((item) => (
              <div
                key={item.originalIndex}
                className='p-4 bg-slate-50 rounded border border-slate-200 flex justify-between items-center gap-4'
              >
                <div>
                  <p className='text-slate-800 italic'>"{item.quote}"</p>
                  <span className='text-sm text-slate-500 block mt-1'>
                    - {item.author}{' '}
                    <span className='text-red-500 font-semibold'>
                      (Likes: {item.likedBy})
                    </span>
                  </span>
                </div>
                <div>
                  {}
                  <Button
                    variant={'secondary'}
                    onClick={() => handleUnlikeQuote(item.originalIndex)}
                  >
                    Unlike
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
