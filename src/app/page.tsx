'use client';

import { 
  Zap, 
  Copy, 
  Check, 
  TrendingDown, 
  DollarSign, 
  Clock,
  Shield,
  Code,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const features = [
  {
    icon: DollarSign,
    title: 'Save 97% on AI Costs',
    description: 'Pay only for what you use. No monthly fees, no hidden charges.',
  },
  {
    icon: Clock,
    title: 'Generate in Seconds',
    description: 'Get production-ready code instantly. No waiting, no setup.',
  },
  {
    icon: Shield,
    title: 'Own Your Code',
    description: 'No vendor lock-in. Your scripts run anywhere you want.',
  },
  {
    icon: Code,
    title: 'Production Ready',
    description: 'Clean, documented code that works out of the box.',
  },
];

const popularTools = [
  { slug: 'cursor-ai-expensive-hobbyist-fix', title: 'Cursor AI Alternative' },
  { slug: 'zapier-overkill-for-tiny-tasks', title: 'Zapier Alternative' },
  { slug: 'gpt-4o-no-subscription-trick', title: 'GPT-4o Without Subscription' },
  { slug: 'chatgpt-plus-vs-api-cost-calculator', title: 'ChatGPT Plus vs API' },
];

export default function HomePage() {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    code: string;
    saas_cost: string;
    our_cost: string;
    explanation: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!task.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.code) {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-slate-900 mb-6">
              Stop Paying for{' '}
              <span className="text-red-600">AI Subscriptions</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed mb-8">
              Generate production-ready AI scripts for pennies. No monthly fees. 
              No vendor lock-in. Just code that works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#generator"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg hover:bg-red-700 active:scale-95 transition-all"
              >
                <Zap className="w-5 h-5 mr-2" />
                Generate Script Now
              </a>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-slate-900 font-bold text-lg hover:border-slate-300 transition-all"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="my-16 lg:my-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="generator" className="my-16 lg:my-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900">
                  Generate Your Script
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    What do you want to automate?
                  </label>
                  <textarea
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="e.g., Convert CSV to JSON using AI, Summarize emails to Slack, Generate unit tests..."
                    className="w-full h-32 p-4 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-600 resize-none"
                  />
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={loading || !task.trim()}
                  className="w-full py-4 bg-red-600 text-white font-bold text-lg hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      STOP THE BLEEDING
                    </>
                  )}
                </button>

                {result && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-200 p-6 text-center">
                        <p className="text-sm text-slate-500 mb-1">SaaS Cost</p>
                        <p className="text-3xl font-black text-slate-900">
                          ${result.saas_cost}
                          <span className="text-base font-normal text-slate-500">/mo</span>
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 p-6 text-center">
                        <p className="text-sm text-green-600 mb-1">Our Cost</p>
                        <p className="text-3xl font-black text-green-600">
                          ${result.our_cost}
                          <span className="text-base font-normal text-green-500">/use</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-slate-900">
                          Generated Code
                        </label>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="code-block text-sm overflow-x-auto max-h-96">
                        <code>{result.code}</code>
                      </pre>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6">
                      <p className="text-sm font-bold text-slate-900 mb-2">
                        Why This Saves Money
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:sticky-sidebar">
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Popular Tools</h3>
                <div className="space-y-3">
                  {popularTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-red-50 border border-red-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-red-900">Average Savings</span>
                </div>
                <p className="text-4xl font-black text-red-600 mb-2">97%</p>
                <p className="text-sm text-red-700">
                  Users save an average of $228/year by switching from SaaS subscriptions to API scripts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-16 lg:my-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 mb-4">
              Why StopAICost?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The SaaS industry is overcharging you. Here&apos;s the truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-8">
              <div className="text-4xl font-black text-red-600 mb-4">$240</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Average Annual SaaS Spend
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Most developers pay $20/month for AI tools they barely use. That&apos;s $240/year for occasional coding help.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8">
              <div className="text-4xl font-black text-green-600 mb-4">$6</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Actual API Cost
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The real cost of AI API calls for typical hobbyist usage? About $0.50/month. That&apos;s $6/year.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8">
              <div className="text-4xl font-black text-slate-900 mb-4">97%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Your Savings
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stop paying for convenience markup. Get the same AI power at raw API prices with StopAICost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
