'use client';

import { createContext, useState } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import { getRandomNumber } from '@/utils/helper-functions';
import { useUser } from '@auth0/nextjs-auth0/client';

export interface Quote {
  id?: string;
  quote: string;
  author: string;
  likedBy?: string[];
}

interface QuotesContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
}

const InitialQuotesContext = {
  quotes: [],
  quoteIndex: 0,
  handleQuoteIndexUpdate: () => console.log(''),
  handleLikeQuote: () => console.log(''),
};

export const QuotesContext =
  createContext<QuotesContextInterface>(InitialQuotesContext);

export function QuotesContextProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(
    initialQuotes.map((q) => ({
      ...q,
      likedBy: Array.isArray(q.likedBy) ? (q.likedBy as string[]) : [],
    }))
  );

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }

    const userId = user.sub as string;

    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikedBy = Array.isArray(quote.likedBy) ? quote.likedBy : [];
        const isLiked = currentLikedBy.includes(userId);

        const updatedLikedBy = isLiked
          ? currentLikedBy.filter((sub) => sub !== userId)
          : [...currentLikedBy, userId];

        return { ...quote, likedBy: updatedLikedBy };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  }

  return (
    <QuotesContext.Provider
      value={{ quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote }}
    >
      {children}
    </QuotesContext.Provider>
  );
}