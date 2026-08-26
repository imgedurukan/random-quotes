'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopNav() {
  const { user } = useUser();
  const pathname = usePathname();

  const isQuotesActive = pathname.startsWith('/user/quotes');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-lg font-bold tracking-tight text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          Random Quotes
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-5">
            <Link
              href="/"
              className={`relative text-sm font-normal transition-colors duration-200 py-1 ${
                pathname === '/'
                  ? 'text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Home
            </Link>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`relative text-sm font-normal transition-colors duration-200 py-1 outline-none flex items-center gap-1 cursor-pointer ${
                    isQuotesActive
                      ? 'text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Quotes <span className="text-xs">▾</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 bg-[var(--bg-card)] border-[var(--border-color)]">
                  <DropdownMenuItem>
                    <Link href="/user/quotes/liked" className="cursor-pointer w-full block">
                      ❤️ Liked Quotes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/quotes/mine" className="cursor-pointer w-full block">
                      📝 My Quotes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/quotes/new" className="cursor-pointer w-full block">
                      ➕ Add Quote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link
              href={user ? '/auth/logout' : '/auth/login'}
              className="text-sm font-normal text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-1"
            >
              {user ? 'Logout' : 'Login'}
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default TopNav;
export { TopNav as Navbar };