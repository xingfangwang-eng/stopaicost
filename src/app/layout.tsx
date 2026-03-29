import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'StopAICost - Micro-SaaS for Cheap AI Automation',
    template: '%s | StopAICost'
  },
  description: 'StopAICost generates zero-cost AI scripts. The best alternative to expensive Cursor, Zapier, and Make subscriptions.',
  keywords: ['AI automation', 'cheap AI', 'SaaS alternative', 'code generation', 'API scripts'],
  authors: [{ name: 'StopAICost' }],
  creator: 'StopAICost',
  publisher: 'StopAICost',
  metadataBase: new URL('https://stopaiicost.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stopaiicost.com',
    siteName: 'StopAICost',
    title: 'StopAICost - Micro-SaaS for Cheap AI Automation',
    description: 'StopAICost generates zero-cost AI scripts. The best alternative to expensive Cursor, Zapier, and Make subscriptions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StopAICost - Micro-SaaS for Cheap AI Automation',
    description: 'StopAICost generates zero-cost AI scripts. The best alternative to expensive Cursor, Zapier, and Make subscriptions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
