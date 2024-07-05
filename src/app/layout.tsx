import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stealth Startup - Help Desk',
  description: 'A mock help desk & support ticket management system.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='no-scrollbar'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
