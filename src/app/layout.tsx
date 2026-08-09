import { Geist, Geist_Mono } from 'next/font/google';
import { QuotesContextProvider } from '@/app/QuotesContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
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
  description: 'Random Quotes Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className='min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300'
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QuotesContextProvider>
            <Navbar />
            {children}
          </QuotesContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}