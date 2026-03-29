'use client';

import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              StopAICost
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/tools" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Tools
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </Link>
            <a
              href="#generator"
              className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-bold hover:bg-red-700 active:scale-95 transition-all"
            >
              Try Now
            </a>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Home
              </Link>
              <Link 
                href="/tools" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Tools
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Pricing
              </Link>
              <a
                href="#generator"
                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-bold"
              >
                Try Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
