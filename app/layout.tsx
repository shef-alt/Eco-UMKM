import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import AppShell from '@/components/AppShell';
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eco-UMKM - Daur Ulang & Marketplace Limbah UMKM',
  description: 'Daur ulang & marketplace limbah untuk UMKM.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`bg-slate-900 flex justify-center items-center h-screen h-dvh m-0 p-0 overflow-hidden ${inter.className}`}>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
