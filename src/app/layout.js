import { Geist, Geist_Mono } from 'next/font/google';
import { QuotesContextProvider } from '@/app/QuotesContext';
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full'>
        <QuotesContextProvider>
          <nav className='p-4 bg-white shadow-sm flex gap-4'>
            <ul className='flex gap-4'>
              <li>
                <Link href='/' className='text-blue-600 hover:underline'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/user/quotes/liked'
                  className='text-blue-600 hover:underline'
                >
                  Liked Quotes
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </QuotesContextProvider>
      </body>
    </html>
  );
}
