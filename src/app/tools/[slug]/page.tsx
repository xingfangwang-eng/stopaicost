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
  
  return {
    title: keyword.title,
    description: description,
    keywords: [keyword.keyword, 'AI automation', 'cheap AI', 'SaaS alternative'],
    openGraph: {
      title: keyword.title,
      description: description,
      type: 'article',
      url: `https://stopaiicost.com/tools/${keyword.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: keyword.title,
      description: description,
    },
    alternates: {
      canonical: `https://stopaiicost.com/tools/${keyword.slug}`,
    },
  };
}

export default async function ToolPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const keyword = keywordsData.find((item: Keyword) => item.slug === slug);
  
  if (!keyword) {
    notFound();
  }

  return <ToolPageContent keyword={keyword} />;
}
