import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WC4677QJMF"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WC4677QJMF', {
            'project_name': 'src'
          });
        ` }} />
        {/* Google HTML Verification Tag */}
        {/* Add your Google verification tag here, for example: */}
       <meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc" />
      </head>
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
