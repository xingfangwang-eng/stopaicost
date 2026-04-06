import { MetadataRoute } from 'next';
import keywordsData from '@/data/keywords.json';

interface Keyword {
  slug: string;
}

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stopaicost.wangdadi.xyz';
  
  const solutionPages = keywordsData.map((item: Keyword) => ({
    url: `${baseUrl}/solutions/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
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
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...solutionPages,
  ];
}
