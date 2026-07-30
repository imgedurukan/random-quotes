'use client';

import { createContext, useState } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import { getRandomNumber } from '@/utils/helper-functions';

export const QuotesContext = createContext([]);

export function QuotesContextProvider({ children }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

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

  function handleUnlikeQuote(indexToUnlike) {
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
