import { Geist, Geist_Mono } from 'next/font/google';
import { QuotesContextProvider } from '@/app/QuotesContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Random Quotes Application',
  description: 'Random Quotes Application 130625',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className='min-h-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300'
      >
        <ThemeProvider>
          <QuotesContextProvider>
            <nav className='p-4 bg-white dark:bg-slate-800 shadow-sm flex justify-between items-center'>
              <ul className='flex gap-4'>
                <li>
                  <Link
                    href='/'
                    className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/user/quotes/liked'
                    className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
                  >
                    Liked Quotes
                  </Link>
                </li>
              </ul>
              <ThemeToggle />
            </nav>
            {children}
          </QuotesContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
