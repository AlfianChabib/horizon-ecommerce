import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import TanstackProviders from '@/components/providers/tanstack-provider';
import './globals.css';
import { SessionStoreProvider } from '@/components/providers/session-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Horizon',
  description: 'Horizon is an e-commerce platform for all your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans relative antialiased', fontSans.variable)}>
        <SessionStoreProvider>
          <TanstackProviders>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </TanstackProviders>
        </SessionStoreProvider>
      </body>
    </html>
  );
}
