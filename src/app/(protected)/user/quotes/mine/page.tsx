'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { QuotesContext } from '@/app/QuotesContext';
import { H3 } from '@/components/typography/H3';
import { H6 } from '@/components/typography/H6';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function MyQuotesPage() {
  const { user } = useUser();
  const context = useContext(QuotesContext);

  const quotes = context?.quotes || [];
  const fetchQuotes = context?.fetchQuotes || (() => {});

  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [editQuoteText, setEditQuoteText] = useState('');
  const [editAuthorText, setEditAuthorText] = useState('');

  const currentUserId = user?.sub;

  const myQuotes = quotes.filter((q) => q.createdBy && q.createdBy === currentUserId);

  const handleDelete = async (quoteId?: string) => {
    if (!quoteId || !currentUserId) return;
    if (!confirm('Are you sure you want to delete this quote?')) return;

    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });

      if (res.ok) {
        fetchQuotes();
      } else {
        alert('Failed to delete quote');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const startEdit = (quoteId?: string, currentQuote?: string, currentAuthor?: string) => {
    if (!quoteId) return;
    setEditingQuoteId(quoteId);
    setEditQuoteText(currentQuote || '');
    setEditAuthorText(currentAuthor || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuoteId || !currentUserId) return;

    try {
      const res = await fetch(`/api/quotes/${editingQuoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: editQuoteText,
          author: editAuthorText,
          userId: currentUserId,
        }),
      });

      if (res.ok) {
        setEditingQuoteId(null);
        fetchQuotes();
      } else {
        alert('Failed to update quote');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 border-b border-[var(--border-color)] pb-4 flex justify-between items-center">
        <div>
          <H3 element="h1" className="text-2xl font-bold text-[var(--text-primary)]">
            My Quotes
          </H3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage the quotes you have shared
          </p>
        </div>
        <Link href="/user/quotes/new">
          <Button variant="default" size="sm">
            + Add New Quote
          </Button>
        </Link>
      </div>

      {myQuotes.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-xl">
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            You haven't added any quotes yet.
          </p>
          <Link href="/user/quotes/new">
            <Button variant="default">Add Your First Quote</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myQuotes.map((item) => (
            <Card
              key={item._id}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px] p-2"
            >
              {editingQuoteId === item._id ? (
                <form onSubmit={handleUpdate} className="flex flex-col gap-3 p-4">
                  <textarea
                    className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-sm focus:outline-none"
                    rows={3}
                    value={editQuoteText}
                    onChange={(e) => setEditQuoteText(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-sm focus:outline-none"
                    value={editAuthorText}
                    onChange={(e) => setEditAuthorText(e.target.value)}
                    required
                  />
                  <div className="flex gap-2 justify-end mt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingQuoteId(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="default" size="sm">
                      Save
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <CardHeader className="flex flex-row justify-end p-4 pb-0 border-none">
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item._id, item.quote, item.author)}
                        className="h-8 px-2 text-xs font-medium cursor-pointer"
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                        className="h-8 px-3 text-xs font-medium cursor-pointer"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 py-4 flex flex-col justify-center flex-grow gap-4 border-none">
                    <H3 element="p" className="italic text-center">
                      "{item.quote}"
                    </H3>

                    <H6 element="p">{item.author}</H6>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}