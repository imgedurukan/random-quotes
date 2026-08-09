'use client';

import { createContext, useState, ReactNode } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import { getRandomNumber } from '@/utils/helper-functions';

const CURRENT_USER_ID = '123';

export interface Quote {
  quote: string;
  author: string;
  likedBy: string[];
}

export interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleToggleLike: (indexToToggle?: number) => void;
}

export const QuotesContext = createContext<QuotesContextType>({
  quotes: [],
  quoteIndex: 0,
  handleQuoteIndexUpdate: () => {},
  handleToggleLike: () => {},
});

export function QuotesContextProvider({ children }: { children: ReactNode }) {

  const formattedInitialQuotes: Quote[] = initialQuotes.map((q: any) => ({
    ...q,
    likedBy: Array.isArray(q.likedBy) ? q.likedBy : [],
  }));

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(formattedInitialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  
  function handleToggleLike(targetIndex?: number) {
    const indexToUpdate = targetIndex ?? quoteIndex;

    const updatedQuotes = quotes.map((quote, id) => {
      if (id === indexToUpdate) {
        const hasLiked = quote.likedBy.includes(CURRENT_USER_ID);

        return {
          ...quote,
          likedBy: hasLiked
            ? quote.likedBy.filter((userId) => userId !== CURRENT_USER_ID)
            : [...quote.likedBy, CURRENT_USER_ID],
        };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        handleQuoteIndexUpdate,
        handleToggleLike,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}