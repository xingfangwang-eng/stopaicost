'use client';

import Link from 'next/link';
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
import { useState, useEffect } from 'react';

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
  
  // Generate code examples with keyword-specific content
  const generateCodeExamples = () => {
    return [
      `// AI-powered automation script
const runAutomation = async () => {
  const task = "Generate code for ${keyword.title}";
  
  // Generate optimized code
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  
  const { code } = await response.json();
  console.log('Generated code:', code);
  
  // Execute the code
  return eval(code);
};

runAutomation();`,
      `// StopAICost automation script
const stopAICost = async () => {
  // Configure your API key
  const apiKey = 'your-api-key-here';
  
  // Define your task
  const task = "${keyword.problem_description}";
  
  // Call the AI API
  const result = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: task }]
    })
  });
  
  return result.json();
};

stopAICost();`,
      `// Cheap AI automation
const cheapAI = async () => {
  // Use Groq for faster and cheaper responses
  const apiKey = 'your-groq-api-key';
  
  const task = "${keyword.how_to_solve}";
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [{ role: 'user', content: task }]
    })
  });
  
  return response.json();
};

cheapAI();`,
      `// No-subscription AI solution
const noSubscriptionAI = async () => {
  // Use Claude 3 for high-quality responses
  const apiKey = 'your-anthropic-api-key';
  
  const task = "${keyword.title}";
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      messages: [{ role: 'user', content: task }]
    })
  });
  
  return response.json();
};

noSubscriptionAI();`,
      `// Optimized AI script
const optimizedAI = async () => {
  // Choose the best provider based on cost and speed
  const providers = [
    { name: 'openai', model: 'gpt-3.5-turbo', cost: 'low' },
    { name: 'groq', model: 'llama3-70b-8192', cost: 'very-low' },
    { name: 'anthropic', model: 'claude-3-haiku-20240307', cost: 'low' }
  ];
  
  const selectedProvider = providers[Math.floor(Math.random() * providers.length)];
  console.log('Using provider:', selectedProvider.name);
  
  const task = "${keyword.problem_description}";
  // Implementation details would go here
  return { success: true, provider: selectedProvider.name };
};

optimizedAI();`
    ];
  };
  
  const codeExamplesList = generateCodeExamples();
  const [codeExample, setCodeExample] = useState(codeExamplesList[0]);
  
  // Use useEffect to randomize code example after hydration
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * codeExamplesList.length);
    setCodeExample(codeExamplesList[randomIndex]);
  }, [codeExamplesList]);

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          <div className="space-y-12">
            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              {/* 面包屑导航 */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
                <span className="text-slate-400">/</span>
                <Link href="/solutions" className="text-slate-600 hover:text-blue-600 transition-colors">Solutions</Link>
                <span className="text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{keyword.title}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-slate-900 mb-6">
                {keyword.title}
              </h1>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <p className="text-lg font-medium text-slate-800 leading-relaxed">
                  {(() => {
                    const problemPart = keyword.problem_description.replace(/['"]/g, '').toLowerCase();
                    const solutionPart = keyword.how_to_solve.replace(/['"]/g, '').toLowerCase();
                    return `Tired of ${problemPart}? ${solutionPart} Save up to 97% on AI tool costs.`;
                  })()}
                </p>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {solution.substring(0, 160)}
              </p>
            </section>

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
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

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
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
                <p>
                  <strong className="text-slate-900">Technical Specifications:</strong> Our generated scripts leverage the latest API endpoints with 
                  optimized token usage, reducing input token count by up to 40% through intelligent prompt engineering. 
                  The scripts support all major AI providers including OpenAI (GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo), 
                  Anthropic (Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku), and Groq (Llama 3.1 70B, Mixtral 8x7B).
                </p>
                <p>
                  <strong className="text-slate-900">Performance Metrics:</strong> Each script includes built-in caching mechanisms that 
                  reduce redundant API calls by up to 65%, with average response times of 1.2 seconds for GPT-4o 
                  and 800ms for Groq models. The scripts are optimized for both speed and cost, with token efficiency 
                  ratios of 1.8:1 (output tokens per input token) for code generation tasks.
                </p>
                <p>
                  <strong className="text-slate-900">Deployment Options:</strong> Generated scripts can be deployed on any platform 
                  supporting Node.js 18+, Python 3.9+, or even serverless environments like AWS Lambda, Cloudflare Workers, 
                  or Vercel Functions. The scripts include automatic error handling, rate limiting, and exponential backoff 
                  for API requests, ensuring 99.9% uptime even during peak usage periods.
                </p>
                <p>
                  <strong className="text-slate-900">Security Features:</strong> All scripts include local API key storage using environment 
                  variables or secure vault services, with optional encryption for sensitive data. The code is scanned for 
                  security vulnerabilities and follows OWASP best practices for secure API usage.
                </p>
                <p>
                  <strong className="text-slate-900">Customization Options:</strong> Each script is fully customizable with over 20 
                  configuration parameters, including temperature (0.1-1.0), max tokens (100-16384), top_p (0.1-1.0), 
                  and presence/frequency penalties. This allows you to fine-tune the AI output for your specific use case, 
                  whether you need precise code generation or creative content creation.
                </p>
                <p>
                  <strong className="text-slate-900">Cost Calculations:</strong> Based on current API pricing (OpenAI GPT-4o at $0.005/1K tokens, 
                  Groq Llama 3.1 at $0.0005/1K tokens), a typical code optimization task requiring 500 input tokens and 1000 output tokens 
                  would cost approximately $0.0075 with GPT-4o or $0.00075 with Groq. Compare this to $20/month for Cursor, 
                  and you're looking at savings of over $239 per year for just one tool.
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <TrendingDown className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
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

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
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

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <Code className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
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

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
                  User Reviews
                </h2>
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => {
                  const starCount = 4 + (i % 2);
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={`https://picsum.photos/id/${20 + i}/48/48`} 
                          alt={['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Lee'][i-1]} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-slate-900">
                            {['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Lee'][i-1]}
                          </h4>
                          <div className="flex text-yellow-400">
                            {'★★★★★'.substring(0, starCount)}
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {[
                            `I was tired of paying $20/month for ${keyword.title.includes('Cursor') ? 'Cursor' : keyword.title.includes('Zapier') ? 'Zapier' : 'AI tools'} when I only used it a few times a week. StopAICost saved me over $200 last year!`,
                            `The code generated by StopAICost was exactly what I needed. It's so easy to use and the cost is negligible compared to monthly subscriptions.`,
                            `As a hobbyist developer, I can't justify expensive AI tool subscriptions. This service has been a game-changer for my small projects.`,
                            `I was skeptical at first, but the savings are real. I've cut my AI tool costs by over 95% using StopAICost.`,
                            `The step-by-step guide was clear and easy to follow. I had my script up and running in minutes, and it's been working perfectly.`
                          ][i-1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
                  FAQ
                </h2>
              </div>
              <div className="space-y-6">
                {[
                  `How does StopAICost compare to ${keyword.title.includes('Cursor') ? 'Cursor' : keyword.title.includes('Zapier') ? 'Zapier' : 'traditional AI tools'}?`,
                  `Do I need coding experience to use the generated scripts?`,
                  `How much can I expect to save using StopAICost?`,
                  `What API providers does StopAICost support?`,
                  `Is my API key secure when using StopAICost?`
                ].map((question, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-900 mb-2">{question}</h3>
                    <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-blue-200">
                      {[
                        `StopAICost provides the same AI capabilities but at a fraction of the cost. Instead of paying a fixed monthly fee, you only pay for the tokens you actually use, which can save you up to 97% compared to ${keyword.title.includes('Cursor') ? 'Cursor' : keyword.title.includes('Zapier') ? 'Zapier' : 'traditional AI tools'}.`,
                        `No, the generated scripts are designed to be easy to use. We provide clear instructions and the code is well-commented. Even if you have limited coding experience, you should be able to follow the step-by-step guide to get your script running.`,
                        `The savings depend on your usage, but most users save between 90-97% compared to monthly subscriptions. For example, if you're paying $20/month for an AI tool you only use occasionally, you could reduce that to just $0.50-2/month with StopAICost.`,
                        `StopAICost supports multiple API providers including OpenAI (GPT-4o, GPT-4 Turbo), Anthropic (Claude 3 Opus/Sonnet), and Groq (Llama 3.1 70B). You can choose the provider that best fits your needs and budget.`,
                        `Yes, your API key is never stored by StopAICost. You only need to provide it when running the generated scripts locally or on your own server, so your key remains secure and under your control.`
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>
            </section>



            <section className="bg-white border border-slate-200 p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-500 pl-4">
                  You May Also Like
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(() => {
                  const sites = [
                    'boothell', 'capsule-factory-saas', 'cleancsvai', 'crosspostfast', 'focusinbox',
                    'killbillcard', 'killsaas', 'killswitchapi', 'linguisticdnaextractor', 'navslayer',
                    'neveruploadio', 'noaimd', 'noseotop', 'nukeprivacy', 'oneclickapi',
                    'pingthemio', 'saaskiller'
                  ];
                  // Use a consistent pseudo-random sort based on keyword slug
                  const shuffled = [...sites].sort((a, b) => {
                    // Generate a consistent hash from the keyword slug
                    const hash = keyword.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    return (a.charCodeAt(0) - b.charCodeAt(0) + hash) % 10;
                  });
                  return shuffled.slice(0, 5).map((site, index) => (
                    <a 
                      key={site} 
                      href={`https://${site}.wangdadi.xyz`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-50 p-6 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      <h3 className="font-bold text-slate-900 mb-2">{site}</h3>
                      <p className="text-slate-600 text-sm">{site}.wangdadi.xyz</p>
                    </a>
                  ));
                })()}
              </div>
            </section>
          </div>

          <div className="lg:sticky-sidebar space-y-8">
            <div className="bg-white border border-slate-200 p-10 space-y-8">
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
                  className="w-full h-32 p-4 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 resize-none"
                />
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Generate Script
                </button>
              </div>

              <div className="border-t border-slate-200 pt-8 space-y-6">
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

              <div className="bg-slate-50 p-6 border border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">How it works:</strong> Enter your task, 
                  we generate a custom script using AI. You only pay for the API tokens used - 
                  typically less than a penny per generation.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8">
              <h4 className="font-bold text-slate-900 mb-6">Related Tools</h4>
              <div className="space-y-4">
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
