'use client';

import { useActionState, useTransition } from 'react';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { addNewQuote } from './action';
import { AddNewQuoteState, NewQuoteInput, newQuoteSchema } from '@/types/quotes';

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isServerPending] = useActionState<
    AddNewQuoteState,
    FormData
  >(addNewQuote, initialAddNewQuoteState);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(newQuoteSchema),
  });

  if (state.success) return redirect('/user/quotes/new/success');

  const onSubmit = (data: NewQuoteInput) => {
    const formData = new FormData();
    formData.append('author', data.author ?? '');
    formData.append('quote', data.quote ?? '');
    formData.append('source', data.source ?? '');

    startTransition(() => {
      dispatchAction(formData);
    });
  };

  const isLoading = isPending || isServerPending;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 border-b border-[var(--border-color)] pb-4">
        <H3 element="h1" className="text-2xl font-bold text-[var(--text-primary)]">
          Add New Quote
        </H3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Share an inspiring quote with the community
        </p>
      </div>

      <div className="max-w-xl mx-auto border border-[var(--border-color)] rounded-xl p-6 bg-[var(--bg-card)] shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="author" className="font-medium text-sm">
                Author
              </FieldLabel>
              <Input
                type="text"
                id="author"
                placeholder="Evil Rabbit"
                aria-invalid={
                  !!clientSideErrors.author || !!state.errors?.fieldErrors?.author
                }
                className="mt-1"
                {...register('author')}
              />
              {clientSideErrors.author ? (
                <FieldError
                  className="text-red-500 text-xs mt-1"
                  errors={[{ message: clientSideErrors.author.message }]}
                >
                  {clientSideErrors.author.message}
                </FieldError>
              ) : (
                state.errors?.fieldErrors?.author && (
                  <FieldError
                    className="text-red-500 text-xs mt-1"
                    errors={state.errors.fieldErrors.author.map((msg) => ({
                      message: msg,
                    }))}
                  >
                    {state.errors.fieldErrors.author.join(', ')}
                  </FieldError>
                )
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="quote" className="font-medium text-sm">
                Quote
              </FieldLabel>
              <Textarea
                id="quote"
                rows={3}
                placeholder="Write the quote here..."
                className="resize-none mt-1"
                aria-invalid={
                  !!clientSideErrors.quote || !!state.errors?.fieldErrors?.quote
                }
                {...register('quote')}
              />
              {clientSideErrors.quote ? (
                <FieldError
                  className="text-red-500 text-xs mt-1"
                  errors={[{ message: clientSideErrors.quote.message }]}
                >
                  {clientSideErrors.quote.message}
                </FieldError>
              ) : (
                state.errors?.fieldErrors?.quote && (
                  <FieldError
                    className="text-red-500 text-xs mt-1"
                    errors={state.errors.fieldErrors.quote.map((msg) => ({
                      message: msg,
                    }))}
                  >
                    {state.errors.fieldErrors.quote.join(', ')}
                  </FieldError>
                )
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="source" className="font-medium text-sm">
                Source <span className="text-gray-400 font-normal">(Optional)</span>
              </FieldLabel>
              <Input
                type="text"
                id="source"
                placeholder="e.g. Book title, Speech, Movie"
                className="mt-1"
                {...register('source')}
              />
            </Field>

            <div className="flex items-center justify-start gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="border border-[var(--border-color)] shadow-sm font-medium"
              >
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
              <Button
                type="button"
                onClick={() => reset()}
                disabled={isLoading}
                className="border border-[var(--border-color)] shadow-sm font-medium"
              >
                Clear
              </Button>
            </div>
          </FieldGroup>
        </form>

        {state.message && <p className="mt-4 text-sm text-red-500 text-center">{state.message}</p>}
      </div>
    </main>
  );
}