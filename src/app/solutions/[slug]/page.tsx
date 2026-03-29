import keywordsData from '@/data/keywords.json';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPageContent } from '@/components/ToolPageContent';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

export async function generateStaticParams() {
  return keywordsData.map((item: Keyword) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const keyword = keywordsData.find((item: Keyword) => item.slug === slug);
  
  if (!keyword) {
    return {
      title: 'Not Found',
    };
  }

  const description = keyword.how_to_solve.substring(0, 160);
  const keywordsArray = [
    keyword.keyword,
    'AI automation',
    'cheap AI',
    'SaaS alternative',
    'AI cost savings',
    'AI scripts',
    'API-based AI',
    'no subscription AI',
    'affordable AI tools'
  ];
  
  return {
    title: keyword.title,
    description: description,
    keywords: keywordsArray,
    openGraph: {
      title: keyword.title,
      description: description,
      type: 'article',
      url: `https://stopaiicost.com/solutions/${keyword.slug}`,
      siteName: 'StopAICost',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: keyword.title,
      description: description,
      site: '@StopAICost',
    },
    alternates: {
      canonical: `https://stopaiicost.com/solutions/${keyword.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
}

export default async function SolutionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const keyword = keywordsData.find((item: Keyword) => item.slug === slug);
  
  if (!keyword) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': keyword.title,
            'description': keyword.how_to_solve,
            'url': `https://stopaiicost.com/solutions/${keyword.slug}`,
            'author': {
              '@type': 'Organization',
              'name': 'StopAICost'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'StopAICost',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://stopaiicost.com/logo.png'
              }
            },
            'datePublished': new Date().toISOString(),
            'dateModified': new Date().toISOString(),
            'articleSection': 'AI Solutions',
            'keywords': keyword.keyword
          })
        }}
      />
      <ToolPageContent keyword={keyword} />
    </>
  );
}
