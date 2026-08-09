'use client';

import Link from 'next/link';
import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          Random Quotes
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 sm:gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/user/quotes/liked">Liked Quotes</NavLink>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}