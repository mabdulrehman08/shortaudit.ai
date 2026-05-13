import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { ScanEye } from 'lucide-react';
import './globals.css';
import { navItems } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://shortaudit.ai'),
  title: {
    default: 'ShortAudit AI — AI-powered short-form video intelligence',
    template: '%s · ShortAudit AI',
  },
  description: 'Upload TikToks, Instagram Reels, and YouTube Shorts before publishing to predict retention, hook quality, pacing, AI risk, and virality.',
  openGraph: {
    title: 'ShortAudit AI',
    description: 'Analyze your content like the algorithm before you post.',
    url: 'https://shortaudit.ai',
    siteName: 'ShortAudit AI',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#05060f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-void font-sans antialiased">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,.32),transparent_28%),radial-gradient(circle_at_top_right,rgba(111,255,233,.18),transparent_30%),linear-gradient(180deg,#05060f_0%,#080b18_45%,#05060f_100%)]" />
          <div className="absolute inset-0 bg-grid bg-[length:44px_44px] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        </div>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-void/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-neon/40 bg-neon/10 shadow-glow">
                <ScanEye className="h-5 w-5 text-neon" />
              </span>
              <span>
                <span className="block text-lg font-black tracking-tight">ShortAudit AI</span>
                <span className="hidden text-xs text-slate-400 sm:block">AI-powered short-form video intelligence</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/upload" className="rounded-full bg-white px-4 py-2 text-sm font-black text-ink transition hover:bg-neon sm:px-5">
              Audit video
            </Link>
          </div>
        </header>
        {children}
        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:px-8">
            <span>© 2026 ShortAudit AI. Built for creators who test before they post.</span>
            <span>Vercel-ready · Supabase Auth · Serverless API routes · OpenAI-ready</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
