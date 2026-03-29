'use client';

import { 
  Zap, 
  AlertTriangle, 
  Lightbulb, 
  Code, 
  Copy, 
  Check,
  ArrowRight,
  DollarSign,
  Clock,
  TrendingDown
} from 'lucide-react';
import { useState } from 'react';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

interface ToolPageContentProps {
  keyword: Keyword;
}

const codeExamples: Record<string, string> = {
  'cursor-ai-expensive-hobbyist-fix': `// Generate code snippets on-demand
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.GROQ_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama-3.1-70b-versatile',
    messages: [{ role: 'user', content: 'Write a function that...' }],
  }),
});`,
  'zapier-overkill-for-tiny-tasks': `# Simple automation without Zapier
import requests

def send_notification(data):
    webhook_url = "YOUR_WEBHOOK_URL"
    response = requests.post(webhook_url, json=data)
    return response.status_code == 200

# Run on GitHub Actions for free!
if __name__ == "__main__":
    send_notification({"message": "Task completed!"})`,
  'gpt-4o-no-subscription-trick': `// Use GPT-4o via API - pay only for what you use
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Your prompt here' }],
  max_tokens: 500,
});

console.log(completion.choices[0].message.content);`,
  'default': `// Your custom automation script
const automate = async () => {
  // Describe your task
  const task = "Your automation description";
  
  // Get AI-powered code
  const code = await generateCode(task);
  
  // Execute and save money
  return execute(code);
};

automate();`
};

function generateContent(keyword: Keyword): { problem: string; solution: string; guide: string[] } {
  const problem = keyword.problem_description;
  const solution = keyword.how_to_solve;
  
  const guide = [
    `Identify the exact task you need automated - in this case: "${keyword.keyword}"`,
    `Use StopAICost to generate a minimal, focused script that does exactly this`,
    `Deploy the script on a free tier service (GitHub Actions, Cloudflare Workers, or Vercel)`,
    `Run it only when needed - pay pennies per execution instead of monthly fees`,
    `Monitor your API usage - you'll likely spend under $1/month for light usage`
  ];

  return { problem, solution, guide };
}

function generateComparisonData(keyword: Keyword) {
  return [
    { feature: 'Monthly Cost', saas: '$20-50', stopaicost: '$0.50-2', savings: '95%+' },
    { feature: 'Setup Time', saas: '15-30 min', stopaicost: '2-5 min', savings: '80%+' },
    { feature: 'Flexibility', saas: 'Limited', stopaicost: 'Unlimited', savings: '∞' },
    { feature: 'API Access', saas: 'Locked', stopaicost: 'Full Control', savings: '100%' },
    { feature: 'Code Ownership', saas: 'No', stopaicost: 'Yes', savings: 'Priceless' },
  ];
}

export function ToolPageContent({ keyword }: ToolPageContentProps) {
  const [copied, setCopied] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const { problem, solution, guide } = generateContent(keyword);
  const comparisonData = generateComparisonData(keyword);
  const codeExample = codeExamples[keyword.slug] || codeExamples['default'];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    if (taskInput.trim()) {
      window.location.href = `/?task=${encodeURIComponent(taskInput)}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-slate-900 mb-6">
                {keyword.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {solution.substring(0, 160)}
              </p>
            </section>

            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">
                  The Problem
                </h2>
              </div>
              <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                <p>{problem}</p>
                <p>
                  This is a classic example of &quot;subscription fatigue&quot; - paying for features you don&apos;t use, 
                  locked into monthly billing cycles that drain your budget. The SaaS industry has normalized 
                  charging $20-50/month for tools that, at their core, are simple API wrappers.
                </p>
                <p>
                  <strong className="text-slate-900">The math is brutal:</strong> If you only use a tool 5 times a month, 
                  you&apos;re paying $4-10 per use. That&apos;s more expensive than premium coffee, for a few lines of code!
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">
                  The Solution
                </h2>
              </div>
              <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                <p>{solution}</p>
                <p>
                  Here&apos;s the secret the SaaS giants don&apos;t want you to know: Most automation tools are just 
                  thin wrappers around APIs like OpenAI, Anthropic, or Groq. When you pay $20/month for Cursor, 
                  you&apos;re paying for convenience - not the actual AI.
                </p>
                <p>
                  With StopAICost, you get the <strong className="text-slate-900">exact same AI power</strong> but 
                  you only pay for the tokens you actually use. For a typical hobbyist coding 50 lines/week, 
                  that&apos;s about $0.50/month instead of $20. That&apos;s a <strong className="text-slate-900">97.5% savings</strong>.
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">
                  Cost Comparison
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Traditional SaaS</th>
                      <th>StopAICost</th>
                      <th>Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index}>
                        <td className="font-medium">{row.feature}</td>
                        <td>{row.saas}</td>
                        <td className="text-green-600 font-bold">{row.stopaicost}</td>
                        <td className="text-red-600 font-bold">{row.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">
                  Step-by-Step Guide
                </h2>
              </div>
              <ol className="space-y-4">
                {guide.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-lg text-slate-600 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">
                  Ready-to-Use Code
                </h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Copy this code and run it yourself. No subscription required - just your own API key.
              </p>
              <div className="relative">
                <pre className="code-block text-sm overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-300" />
                  )}
                </button>
              </div>
            </section>
          </div>

          <div className="lg:sticky-sidebar">
            <div className="bg-white border border-slate-200 p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 mx-auto flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Try It Now
                </h3>
                <p className="text-slate-600 text-sm">
                  Generate your custom script in seconds
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder={keyword.keyword}
                  className="w-full h-32 p-4 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-600 resize-none"
                />
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 bg-red-600 text-white font-bold text-lg hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Generate Script
                </button>
              </div>

              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-slate-600">
                    Estimated cost: <strong className="text-slate-900">$0.01-0.05</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-slate-600">
                    Generation time: <strong className="text-slate-900">~3 seconds</strong>
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">How it works:</strong> Enter your task, 
                  we generate a custom script using AI. You only pay for the API tokens used - 
                  typically less than a penny per generation.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">Related Tools</h4>
              <div className="space-y-3">
                <a href="/tools/api-pricing-vs-subscription-comparison" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  API vs Subscription Calculator
                </a>
                <a href="/tools/chatgpt-plus-vs-api-cost-calculator" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  ChatGPT Plus vs API Cost
                </a>
                <a href="/tools/save-money-cursor-ai" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  Save Money on Cursor AI
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
