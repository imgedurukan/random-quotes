'use server';

import { auth0 } from '@/lib/auth0';
import { AddNewQuoteState, newQuoteSchema } from '@/types/quotes';
import z from 'zod';

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in to add a quote.',
    };
  }

  const rawData = {
    author: (formData.get('author') as string) || '',
    quote: (formData.get('quote') as string) || '',
    source: (formData.get('source') as string) || '',
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);

    return {
      success: false,
      errors: validationErrors,
      data: rawData,
    };
  } else {
    return {
      success: true,
    };
  }
}