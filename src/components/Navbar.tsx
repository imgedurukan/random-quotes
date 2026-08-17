'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ThemeToggle } from '@/components/ThemeToggle';

export function TopNav() {
  const { user } = useUser();
  const pathname = usePathname();

  const appRoutes = [
    {
      name: 'Home',
      url: '/',
      protectedPage: false,
    },
    {
      name: 'Liked Quotes',
      url: '/user/quotes/liked',
      protectedPage: true,
    },
    {
      name: 'Add Quote',
      url: '/user/quotes/new',
      protectedPage: true,
    },
    {
      name: user ? 'Logout' : 'Login',
      url: user ? '/auth/logout' : '/auth/login',
      protectedPage: false,
    },
  ];

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
            {appRoutes.map(({ name, url, protectedPage }) => {
              if (protectedPage && !user) return null;

              const isActive = pathname === url;

              return (
                <Link
                  key={name}
                  href={url}
                  className={`relative text-sm font-normal transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default TopNav;
export { TopNav as Navbar };