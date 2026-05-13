import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Clock, ShieldAlert, Upload, Users, type LucideIcon } from 'lucide-react';
import { Card, Section, ScoreBar } from '@/components/ui';
import { RetentionGraph } from '@/components/retention-graph';
import { sampleReport } from '@/lib/constants';

export const metadata: Metadata = { title: 'Dashboard' };

const videos = [
  ['AI workflow audit', '412K', '84', 'Winner'],
  ['Fastlane demo short', '58K', '72', 'Needs hook'],
  ['Reels growth myth', '1.2M', '94', 'Winner'],
  ['Faceless news recap', '9K', '61', 'Flopped'],
];

export default function DashboardPage() {
  return (
    <main>
      <Section className="pb-8 pt-12">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="font-bold text-neon">Creator analytics dashboard</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight">Measure how audits improve reach.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">Track uploaded videos, predicted retention, real views, engagement quality, AI score improvements, and trends between successful and failed shorts.</p>
          </div>
          <Link href="/upload" className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 font-black text-ink"><Upload className="h-5 w-5" /> New audit</Link>
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Stat icon={BarChart3} label="Average viral score" value="82" detail="+14 this month" />
          <Stat icon={Clock} label="Predicted retention" value="71%" detail="Top 18% niche" />
          <Stat icon={ShieldAlert} label="Shadowban risk" value="Low" detail="3 warnings open" />
          <Stat icon={Users} label="Team seats" value="8" detail="Agency workspace" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card>
            <RetentionGraph data={sampleReport.retentionCurve} />
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/5 text-slate-400"><tr>{['Video', 'Views', 'AI score', 'Status'].map((head) => <th key={head} className="px-5 py-4 font-bold">{head}</th>)}</tr></thead>
                <tbody className="divide-y divide-white/10">{videos.map((row) => <tr key={row[0]}><td className="px-5 py-4 font-bold">{row[0]}</td><td className="px-5 py-4">{row[1]}</td><td className="px-5 py-4 text-neon">{row[2]}</td><td className="px-5 py-4"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{row[3]}</span></td></tr>)}</tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-black">Score improvements</h2>
            <div className="mt-5 space-y-4">
              <ScoreBar label="Hook quality" value={88} />
              <ScoreBar label="Caption readability" value={82} />
              <ScoreBar label="Pacing" value={79} tone="pulse" />
              <ScoreBar label="CTA placement" value={61} tone="warning" />
              <ScoreBar label="AI sameness risk" value={34} tone="flare" />
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}

function Stat({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return <Card><Icon className="mb-4 h-6 w-6 text-neon" /><div className="text-sm text-slate-400">{label}</div><div className="mt-1 text-3xl font-black">{value}</div><div className="mt-2 text-xs font-semibold text-neon">{detail}</div></Card>;
}
