'use client';

import { createContext, useState, ReactNode } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import { getRandomNumber } from '@/utils/helper-functions';

export interface Quote {
  quote: string;
  author: string;
  likedBy?: number;
  isLiked?: boolean;
}

export interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
  handleUnlikeQuote: (indexToUnlike: number) => void;
}

export const QuotesContext = createContext<QuotesContextType>({
  quotes: [],
  quoteIndex: 0,
  handleQuoteIndexUpdate: () => {},
  handleLikeQuote: () => {},
  handleUnlikeQuote: () => {},
});

export function QuotesContextProvider({ children }: { children: ReactNode }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikes =
          typeof quote.likedBy === 'number' ? quote.likedBy : 0;

        if (quote.isLiked) {
          return {
            ...quote,
            likedBy: currentLikes > 0 ? currentLikes - 1 : 0,
            isLiked: false,
          };
        } else {
          return {
            ...quote,
            likedBy: currentLikes + 1,
            isLiked: true,
          };
        }
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  }

  function handleUnlikeQuote(indexToUnlike: number) {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === indexToUnlike) {
        const currentLikes =
          typeof quote.likedBy === 'number' ? quote.likedBy : 0;
        return {
          ...quote,
          likedBy: currentLikes > 0 ? currentLikes - 1 : 0,
          isLiked: false,
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
        handleLikeQuote,
        handleUnlikeQuote,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}