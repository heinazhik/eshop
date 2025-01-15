'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <SessionProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
