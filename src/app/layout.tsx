import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'eShop - Modern E-commerce',
  description: 'A modern, minimalist e-commerce website built with Next.js 13+ and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
