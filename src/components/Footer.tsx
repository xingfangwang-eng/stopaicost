import Link from 'next/link';
import { Zap, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">
                StopAICost
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">
              StopAICost generates zero-cost AI scripts. The best alternative to expensive Cursor, Zapier, and Make subscriptions.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
                Home
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Contact Support</h3>
            <p className="text-sm text-slate-600 mb-4">
              If you have any questions or need assistance, please contact our support team:
            </p>
            <a href="mailto:457239850@qq.com" className="text-sm text-blue-600 font-bold hover:text-blue-700">
              Support: 457239850@qq.com
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2026 StopAICost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
