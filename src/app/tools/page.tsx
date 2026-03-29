import { Metadata } from 'next';
import keywordsData from '@/data/keywords.json';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

export const metadata: Metadata = {
  title: 'AI Automation Tools - Browse All',
  description: 'Browse 100+ AI automation tools and scripts. Find the perfect solution for your task without expensive SaaS subscriptions.',
};

export default function ToolsPage() {
  const keywords = keywordsData as Keyword[];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-slate-900 mb-6">
              AI Automation Tools
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Browse {keywords.length}+ tools to automate your tasks without expensive SaaS subscriptions.
              Each tool comes with ready-to-use code and step-by-step guides.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keywords.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white border border-slate-200 p-6 hover:border-red-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                    <Zap className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-red-600 transition-colors" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {tool.problem_description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
