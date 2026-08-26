'use server';

import { auth0 } from '@/lib/auth0';
import { Collections, getDb } from '@/lib/db';
import { quotes } from '@/quotes';
import { AddNewQuoteState, newQuoteSchema } from '@/types/quotes';
import z from 'zod';

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();
  const user = session?.user;
  console.log('user', user);

  if (!session || !user) {
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
    const db = await getDb();
    const col = db.collection(Collections.quotes);
    const now = new Date();

    const newQuote = {
      quote: validationOutput.data.quote,
      author: validationOutput.data.author,
      createdBy: user.sub,
      adminApproved: false,
      createdAt: now,
      updatedAt: now,
    }

    await col.insertOne(newQuote);


    return {
      success: true,
    };
  }
}