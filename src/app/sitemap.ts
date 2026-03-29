import { MetadataRoute } from 'next';
import keywordsData from '@/data/keywords.json';

interface Keyword {
  slug: string;
}

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stopaiicost.com';
  
  const toolPages = keywordsData.map((item: Keyword) => ({
    url: `${baseUrl}/tools/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...toolPages,
  ];
}
