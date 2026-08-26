'use client';

import { createContext, useEffect, useState } from 'react';
import { getRandomNumber } from '@/utils/helper-functions';
import { useUser } from '@auth0/nextjs-auth0/client';

export interface Quote {
  _id?: string;
  quote: string;
  author: string;
  likedBy?: number;
  likedByUsers?: string[];
  createdBy?: string;
}

interface QuotesContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  isLoading: boolean;
  error: string | null;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: (targetIndex?: number) => void;
  fetchQuotes: () => void;
}

const InitialQuotesContext: QuotesContextInterface = {
  quotes: [],
  quoteIndex: 0,
  isLoading: true,
  error: null,
  handleQuoteIndexUpdate: () => {},
  handleLikeQuote: () => {},
  fetchQuotes: () => {},
};

export const QuotesContext = createContext<QuotesContextInterface>(InitialQuotesContext);

export function QuotesContextProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quotes');
      if (!response.ok) {
        throw new Error('Failed to load quotes');
      }
      const data = await response.json();
      
      const formattedQuotes = (data.quotes || []).map((q: any) => {
        const userList = Array.isArray(q.likedBy) ? q.likedBy : [];
        return {
          ...q,
          likedBy: userList.length,
          likedByUsers: userList,
        };
      });

      setQuotes(formattedQuotes);
      setQuoteIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
      setQuotes([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleQuoteIndexUpdate() {
    if (quotes.length === 0) return;
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  async function handleLikeQuote(targetIndex?: number) {
    if (!user) {
      window.location.href = '/api/auth/login';
      return;
    }

    const indexToUpdate = typeof targetIndex === 'number' ? targetIndex : quoteIndex;
    const targetQuote = quotes[indexToUpdate];

    if (!targetQuote || !user.sub) return;

    const currentUsers = targetQuote.likedByUsers || [];
    const isLiked = currentUsers.includes(user.sub);
    const updatedUsers = isLiked
      ? currentUsers.filter((id) => id !== user.sub)
      : [...currentUsers, user.sub];

    const updatedQuotes = quotes.map((quote, idx) => {
      if (idx === indexToUpdate) {
        return {
          ...quote,
          likedBy: updatedUsers.length,
          likedByUsers: updatedUsers,
        };
      }
      return quote;
    });

    setQuotes(updatedQuotes);

    if (targetQuote._id) {
      try {
        await fetch('/api/quotes/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quoteId: targetQuote._id,
            userId: user.sub,
          }),
        });
      } catch (err) {
        console.error('Failed to sync like status:', err);
      }
    }
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        isLoading,
        error,
        handleQuoteIndexUpdate,
        handleLikeQuote,
        fetchQuotes: fetchData,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}