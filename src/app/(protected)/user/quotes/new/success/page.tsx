import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/typography/H3';

export default function QuoteSuccessPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="max-w-md w-full border border-[var(--border-color)] rounded-xl p-8 bg-[var(--bg-card)] shadow-sm text-center">
        <div className="text-4xl text-center mb-4">✅</div>

        <H3 element="h1" className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Quote Submitted!
        </H3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          Thank you for adding a new quote. It&apos;s now sent to administrator for review.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/user/quotes/new" className="w-full sm:w-auto">
            <Button className="w-full border border-[var(--border-color)] shadow-sm font-medium">
              Add Another Quote
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border border-[var(--border-color)] shadow-sm font-medium"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}