'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// 读取关键词数据
import keywords from '@/data/keywords.json';

// 智能分类函数
function categorizeKeywords(keywords: any[]) {
  const categories: Record<string, any[]> = {
    'AI Cost Optimization': [],
    'AI Tools Alternatives': [],
    'Code & Development': [],
    'Content & Writing': [],
    'Productivity & Automation': []
  };

  keywords.forEach(item => {
    const text = (item.keyword + ' ' + item.title).toLowerCase();
    
    if (text.includes('cost') || text.includes('cheap') || text.includes('save') || text.includes('expensive')) {
      categories['AI Cost Optimization'].push(item);
    } else if (text.includes('alternative') || text.includes('vs') || text.includes('instead') || text.includes('replace')) {
      categories['AI Tools Alternatives'].push(item);
    } else if (text.includes('code') || text.includes('program') || text.includes('develop') || text.includes('script')) {
      categories['Code & Development'].push(item);
    } else if (text.includes('write') || text.includes('content') || text.includes('text') || text.includes('article')) {
      categories['Content & Writing'].push(item);
    } else {
      categories['Productivity & Automation'].push(item);
    }
  });

  return categories;
}

// 生成 JSON-LD Schema
function generateSchema() {
  const items = keywords.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'url': `https://stopaiicost.com/solutions/${item.slug}`,
    'name': item.title,
    'description': item.problem_description
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'AI Solutions',
    'description': '100+ cost-effective AI solutions to optimize workflow and save money on expensive AI tools',
    'itemListElement': items
  };
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState(keywords);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const categories = categorizeKeywords(keywords);

  // 搜索筛选
  useEffect(() => {
    if (searchTerm) {
      const filtered = keywords.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredKeywords(filtered);
    } else {
      setFilteredKeywords(keywords);
    }
  }, [searchTerm]);

  // 切换分类展开/折叠
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />

      {/* 页面容器 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 my-12">
        {/* 面包屑导航 */}
        <div className="flex items-center gap-2 mb-12 text-sm">
          <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Solutions</span>
        </div>
        
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
            AI Solutions
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover 100+ cost-effective AI solutions to optimize your workflow and save money on expensive AI tools.
          </p>
        </div>

        {/* 吸顶搜索框 */}
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200 py-4 mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:border-blue-600 text-lg"
              />
            </div>
          </div>
        </div>

        {/* 分类导航 */}
        <nav className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6">
            Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-blue-600 transition-colors"
              >
                <span className="font-medium text-slate-900">{category}</span>
                {expandedCategory === category ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* 搜索结果 */}
        {searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6">
              Search Results ({filteredKeywords.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKeywords.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-600 transition-colors">
                  <Link href={`/solutions/${item.slug}`} className="block hover:no-underline">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {item.problem_description.length > 100 
                        ? item.problem_description.substring(0, 100) + '...' 
                        : item.problem_description
                      }
                    </p>
                    <div className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      View Solution →
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 分类内容 */}
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-12">
            {expandedCategory === category && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6">
                  {category} ({items.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-600 transition-colors">
                      <Link href={`/solutions/${item.slug}`} className="block">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {item.problem_description.length > 100 
                            ? item.problem_description.substring(0, 100) + '...' 
                            : item.problem_description
                          }
                        </p>
                        <div className="flex items-center text-sm text-blue-600 font-medium">
                          View Solution →
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        {/* 全部解决方案 */}
        {!searchTerm && expandedCategory === null && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6">
              All Solutions ({keywords.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keywords.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-600 transition-colors">
                  <Link href={`/solutions/${item.slug}`} className="block hover:no-underline">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {item.problem_description.length > 100 
                        ? item.problem_description.substring(0, 100) + '...' 
                        : item.problem_description
                      }
                    </p>
                    <div className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      View Solution →
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
