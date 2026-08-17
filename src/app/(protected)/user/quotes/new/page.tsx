'use client';

import { useActionState } from 'react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { H3 } from '@/components/typography/H3';
import { addNewQuote, type AddNewQuoteState } from './action';

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    AddNewQuoteState,
    FormData
  >(addNewQuote, initialAddNewQuoteState);

  if (state.success) return redirect('/user/quotes/new/success');

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Liked Quotes ile Birebir Başlık Yapısı */}
      <div className="mb-6 border-b border-[var(--border-color)] pb-4">
        <H3 element="h1" className="text-2xl font-bold text-[var(--text-primary)]">
          Add New Quote
        </H3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Share an inspiring quote with the community
        </p>
      </div>

      {/* Form Kartı */}
      <div className="max-w-xl mx-auto border border-[var(--border-color)] rounded-xl p-6 bg-[var(--bg-card)] shadow-sm">
        <form action={dispatchAction}>
          {/* space-y-4 ile alanlar arasındaki boşluğu sıkılaştırdık */}
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="author" className="font-medium text-sm">
                Author
              </FieldLabel>
              <Input
                type="text"
                name="author"
                id="author"
                placeholder="e.g. Evil Rabbit"
                aria-invalid={!!state.errors?.fieldErrors?.author}
                aria-describedby={
                  state.errors?.fieldErrors?.author ? 'author-error' : undefined
                }
                defaultValue={state.data?.author ?? ''}
                className="mt-1"
              />
              <div id="author-error" aria-live="polite">
                {state.errors?.fieldErrors?.author?.map((err, i) => (
                  <FieldError key={i} className="text-red-500 text-xs mt-1">
                    {err}
                  </FieldError>
                ))}
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="quote" className="font-medium text-sm">
                Quote
              </FieldLabel>
              <Textarea
                id="quote"
                name="quote"
                rows={3}
                placeholder="Write the quote here..."
                className="resize-none mt-1"
                aria-invalid={!!state.errors?.fieldErrors?.quote}
                aria-describedby={
                  state.errors?.fieldErrors?.quote ? 'quote-error' : undefined
                }
                defaultValue={state.data?.quote ?? ''}
              />
              <div id="quote-error" aria-live="polite">
                {state.errors?.fieldErrors?.quote?.map((err, i) => (
                  <FieldError key={i} className="text-red-500 text-xs mt-1">
                    {err}
                  </FieldError>
                ))}
              </div>
            </Field>

            <div className="flex items-center justify-start gap-3 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="border border-[var(--border-color)] shadow-sm font-medium"
              >
                {isPending ? 'Creating...' : 'Create Quote'}
              </Button>

              <Button
                type="reset"
                disabled={isPending}
                className="border border-[var(--border-color)] shadow-sm font-medium"
              >
                Clear
              </Button>
            </div>
          </FieldGroup>
        </form>

        {state.message && (
          <p className="mt-4 text-sm text-red-500 text-center" aria-live="assertive">
            {state.message}
          </p>
        )}
      </div>
    </main>
  );
}