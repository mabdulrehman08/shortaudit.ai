import type { Metadata } from 'next';
import { History } from 'lucide-react';
import { Badge, Card, Section } from '@/components/ui';

export const metadata: Metadata = { title: 'History' };

const rows = [
  ['AI workflow audit', 'May 13, 2026', '84', '76%', 'Completed'],
  ['Fastlane demo short', 'May 12, 2026', '72', '61%', 'Needs edits'],
  ['Reels growth myth', 'May 11, 2026', '94', '83%', 'Winner'],
];

export default function HistoryPage() {
  return (
    <main>
      <Section className="pt-12">
        <Badge icon={History}>User history</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Every upload, transcript, score, and report in one place.</h1>
        <Card className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-slate-400"><tr>{['Video', 'Created', 'Viral score', 'Retention', 'Status'].map((head) => <th key={head} className="px-5 py-4 font-bold">{head}</th>)}</tr></thead>
            <tbody className="divide-y divide-white/10">{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="px-5 py-4">{cell}</td>)}</tr>)}</tbody>
          </table>
        </Card>
      </Section>
    </main>
  );
}
