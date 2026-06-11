'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ClipboardCheck, Sparkles, WandSparkles } from 'lucide-react';
import { Card, ScoreBar } from '@/components/ui';

const presets = [
  'AI workflow that turns one idea into ten short videos',
  'Founder posts daily for 30 days and finally gets qualified leads',
  'Agency audits a failed Reel and finds the hook mistake',
];

export function DemoConsole() {
  const [idea, setIdea] = useState(presets[0]);
  const [platform, setPlatform] = useState('TikTok');
  const score = useMemo(() => {
    const words = idea.trim().split(/\s+/).filter(Boolean).length;
    const specificity = /\d|founder|agency|workflow|audit|failed/i.test(idea) ? 12 : 0;
    return Math.min(96, 68 + specificity + Math.min(words, 12));
  }, [idea]);

  const hooks = [
    `I audited this ${platform} before posting, and one line was killing retention.`,
    `This ${platform} idea looks good until you see the 6-second drop.`,
    `Before you publish "${idea.slice(0, 42)}", fix this hook first.`,
  ];

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-40 w-40 bg-lime/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-black text-lime"><Sparkles className="h-4 w-4" /> Live preflight</p>
            <h2 className="mt-1 text-2xl font-black">Content audit console</h2>
          </div>
          <div className="rounded-lg border border-lime/30 bg-lime/10 px-4 py-3 text-center">
            <div className="text-3xl font-black text-lime">{score}</div>
            <div className="text-xs font-bold uppercase text-slate-400">score</div>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-bold text-slate-300">Video idea</span>
          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            className="min-h-28 w-full rounded-lg border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-lime"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['TikTok', 'Reels', 'Shorts'].map((item) => (
            <button
              key={item}
              onClick={() => setPlatform(item)}
              className={`rounded-lg border px-4 py-3 text-sm font-black transition ${platform === item ? 'border-lime bg-lime text-ink' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ScoreBar label="Hook clarity" value={Math.min(98, score + 3)} />
          <ScoreBar label="Scroll risk" value={Math.max(18, 100 - score)} tone="flare" />
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-black text-lime"><WandSparkles className="h-4 w-4" /> Hook rewrites</p>
          <div className="space-y-2">
            {hooks.map((hook) => (
              <div key={hook} className="rounded-lg bg-white/[0.06] p-3 text-sm leading-6 text-slate-200">{hook}</div>
            ))}
          </div>
        </div>

        <a href="/upload" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-4 font-black text-ink transition hover:bg-white">
          Run full audit <ClipboardCheck className="h-5 w-5" /> <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </Card>
  );
}
